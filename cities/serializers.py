from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    runners_count = serializers.IntegerField(read_only=True)
    runningclubs_count = serializers.IntegerField(read_only=True)
    race_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'country', 'image', 'runners_count', 'runningclubs_count', 'race_count', 'created_at', 'updated_at']

class CityDetailSerializer(CitySerializer):
    active_runups = serializers.SerializerMethodField()
    profiles = serializers.SerializerMethodField()
    races = serializers.SerializerMethodField()

    class Meta(CitySerializer.Meta):
        fields = CitySerializer.Meta.fields + ['active_runups', 'profiles', 'races']

    def get_active_runups(self, obj):
        active_runups = obj.active_runups()
        return [{
            'id': runup.id,
            'host': runup.host.username,
            'location': runup.location,
            'date_time': runup.date_time,
            'visibility': runup.visibility,
            'is_active': runup.is_active,
            'distance': runup.distance,
            'pace': runup.pace,
            'duration': runup.duration,
            'route': runup.route,
            'participants_count': runup.participants.count(),
        } for runup in active_runups]

    def get_profiles(self, obj):
        profiles = obj.profiles.all()
        return [{
            'id': profile.id,
            'user': profile.user.username,
        } for profile in profiles]

    def get_races(self, obj):
        races = obj.races.all()
        return [{
            'id': race.id,
            'name': race.name,
            'date': race.date,
            # Add other race fields as needed
        } for race in races]