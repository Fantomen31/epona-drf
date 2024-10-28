from rest_framework import serializers
from .models import RunUp
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class RunUpSerializer(serializers.ModelSerializer):
    host = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    participants_count = serializers.SerializerMethodField()
    is_joined = serializers.SerializerMethodField()

    class Meta:
        model = RunUp
        fields = ['id', 'host', 'description', 'location', 'date_time', 'visibility', 'city', 
                  'is_active', 'created_at', 'updated_at', 'participants', 'participants_count', 
                  'is_joined', 'distance', 'pace', 'duration', 'route']
        read_only_fields = ['id', 'host', 'is_active', 'created_at', 'updated_at']

    def get_participants_count(self, obj):
        return obj.participants.count()

    def get_is_joined(self, obj):
        user = self.context['request'].user
        return user in obj.participants.all() if user.is_authenticated else False

