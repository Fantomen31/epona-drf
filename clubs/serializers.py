from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Club, ClubMembership, ClubJoinRequest, ClubStatistics, ClubRunUp
from cities.serializers import CitySerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ClubRunUpSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = ClubRunUp
        fields = [
            'id', 'title', 'description', 'date_time', 'meeting_point',
            'distance', 'pace', 'created_by', 'participants',
            'created_at', 'updated_at'
        ]

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
    sister_cities = CitySerializer(many=True, read_only=True)
    creator = UserSerializer(read_only=True)
    statistics = ClubStatisticsSerializer(read_only=True)
    member_count = serializers.IntegerField(source='statistics.total_members', read_only=True)
    is_member = serializers.SerializerMethodField()
    member_role = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = [
            'id', 'name', 'description', 'main_city', 'sister_cities',
            'creator', 'contact_email', 'website', 'social_links',
            'visibility', 'membership_type', 'weekly_meetup_schedule',
            'created_at', 'updated_at', 'statistics', 'member_count',
            'is_member', 'member_role'
        ]
        read_only_fields = ['creator', 'statistics', 'member_count']

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
        return data