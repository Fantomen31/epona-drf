from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    runners_count = serializers.IntegerField(read_only=True)
    running_clubs_count = serializers.IntegerField(read_only=True)
    races_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'country', 'weather_info', 'timezone', 'runners_count', 'running_clubs_count', 'races_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']