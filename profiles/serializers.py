from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from events.serializers import EventSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    running_level_display = serializers.CharField(source='get_running_level_display', read_only=True)
    is_owner = serializers.SerializerMethodField()
    participated_events = EventSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'bio', 'location', 'running_level', 
            'running_level_display', 'image', 'created_at', 
            'updated_at', 'is_owner', 'participated_events'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.user if request and request.user.is_authenticated else False