from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Club, ClubMembership, ClubJoinRequest, ClubStatistics, ClubRunUp
from cities.serializers import CitySerializer
from cities.models import City

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        ref_name = "ClubsUser"

class ClubRunUpSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    is_participant = serializers.SerializerMethodField()
    
    class Meta:
        model = ClubRunUp
        fields = [
            'id', 'title', 'description', 'date_time', 'meeting_point',
            'distance', 'pace', 'created_by', 'participants',
            'created_at', 'updated_at', 'is_participant'
        ]

    def get_is_participant(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user in obj.participants.all()
        return False

class ClubStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubStatistics
        fields = [
            'total_members', 'total_distance', 'weekly_distance',
            'monthly_distance', 'yearly_distance', 'average_pace',
            'total_runups', 'average_runup_attendance', 'last_updated'
        ]

class ClubMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ClubMembership
        fields = ['user', 'role', 'joined_at', 'total_distance', 'average_pace']

class ClubJoinRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    processed_by = UserSerializer(read_only=True)

    class Meta:
        model = ClubJoinRequest
        fields = ['id', 'user', 'status', 'created_at', 'processed_at', 'processed_by']
        read_only_fields = ['status', 'processed_at', 'processed_by']

class ClubSerializer(serializers.ModelSerializer):
    main_city = CitySerializer(read_only=True)
    main_city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        write_only=True,
        source='main_city'
    )
    sister_cities = CitySerializer(many=True, read_only=True)
    sister_city_ids = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        many=True,
        required=False,
        write_only=True,
        source='sister_cities'
    )
    creator = UserSerializer(read_only=True)
    statistics = serializers.SerializerMethodField()
    member_count = serializers.SerializerMethodField()
    is_member = serializers.SerializerMethodField()
    member_role = serializers.SerializerMethodField()
    can_request_membership = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = [
            'id', 'name', 'description', 'main_city', 'main_city_id',
            'sister_cities', 'sister_city_ids', 'creator', 'contact_email', 
            'website', 'social_links', 'visibility', 'membership_type', 
            'weekly_meetup_schedule', 'created_at', 'updated_at', 
            'statistics', 'member_count', 'is_member', 'member_role',
            'can_request_membership'
        ]
        read_only_fields = ['creator', 'statistics', 'member_count']

    def validate_main_city_id(self, value):
        if not City.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Selected city does not exist")
        return value

    def get_statistics(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.memberships.filter(user=request.user).exists():
                return ClubStatisticsSerializer(obj.statistics).data
        return None

    def get_member_count(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.memberships.filter(user=request.user).exists():
                return obj.statistics.total_members if hasattr(obj, 'statistics') else 0
        return None

    def get_is_member(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.memberships.filter(user=request.user).exists()
        return False

    def get_member_role(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            membership = obj.memberships.filter(user=request.user).first()
            return membership.role if membership else None
        return None

    def get_can_request_membership(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            is_member = obj.memberships.filter(user=request.user).exists()
            has_pending_request = obj.join_requests.filter(user=request.user, status='PENDING').exists()
            return not (is_member or has_pending_request)
        return False

    def create(self, validated_data):
        sister_cities = validated_data.pop('sister_cities', [])
        club = Club.objects.create(**validated_data)
        if sister_cities:
            club.sister_cities.set(sister_cities)
        return club

    def update(self, instance, validated_data):
        sister_cities = validated_data.pop('sister_cities', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if sister_cities is not None:
            instance.sister_cities.set(sister_cities)
        return instance

class ClubDetailSerializer(ClubSerializer):
    members = ClubMembershipSerializer(source='memberships', many=True, read_only=True)
    recent_runups = ClubRunUpSerializer(many=True, read_only=True)
    pending_requests = serializers.SerializerMethodField()

    class Meta(ClubSerializer.Meta):
        fields = ClubSerializer.Meta.fields + ['members', 'recent_runups', 'pending_requests']

    def get_pending_requests(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            membership = obj.memberships.filter(user=request.user).first()
            if membership and membership.role in ['CREATOR', 'ADMIN']:
                pending_requests = obj.join_requests.filter(status='PENDING')
                return ClubJoinRequestSerializer(pending_requests, many=True).data
        return []

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['recent_runups'] = ClubRunUpSerializer(
            instance.runups.order_by('-date_time')[:5],
            many=True,
            context=self.context
        ).data
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            membership = instance.memberships.filter(user=request.user).first()
            if membership and membership.role in ['CREATOR', 'ADMIN']:
                data['pending_requests'] = ClubJoinRequestSerializer(
                    instance.join_requests.filter(status='PENDING'),
                    many=True
                ).data
            else:
                data['pending_requests'] = []
        else:
            data['pending_requests'] = []
        return data

class ClubJoinRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubJoinRequest
        fields = ['club']

    def create(self, validated_data):
        user = self.context['request'].user
        club = validated_data['club']
        
        # Check if user is already a member
        if ClubMembership.objects.filter(club=club, user=user).exists():
            raise serializers.ValidationError("You are already a member of this club.")
        
        # Check if there's a pending request
        if ClubJoinRequest.objects.filter(club=club, user=user, status='PENDING').exists():
            raise serializers.ValidationError("You already have a pending join request for this club.")
        
        join_request = ClubJoinRequest.objects.create(club=club, user=user)
        return join_request

class ClubJoinRequestProcessSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['APPROVE', 'REJECT'])

    def validate(self, data):
        request = self.context['request']
        club = self.context['club']
        membership = club.memberships.filter(user=request.user).first()
        if not membership or membership.role not in ['CREATOR', 'ADMIN']:
            raise serializers.ValidationError("You don't have permission to process join requests.")
        return data