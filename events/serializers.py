# events/serializers.py
from rest_framework import serializers
from .models import Event, EventRace
from cities.serializers import CitySerializer
#from clubs.serializers import ClubSerializer

class EventRaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRace
        fields = ['id', 'race_type', 'start_time', 'price']

class EventSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    city_id = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), write_only=True, source='city')
    races = EventRaceSerializer(many=True, read_only=True)
    organizers = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    #clubs = ClubSerializer(many=True, read_only=True)
    is_registered = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'city', 'city_id', 'event_type', 'date', 'description', 'registration_url', 
                  'price', 'difficulty_level', 'created_at', 'updated_at', 'organizers', 'participants', 
                  'clubs', 'races', 'is_registered']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_registered']

    def get_is_registered(self, obj):
        user = self.context['request'].user
        return user in obj.participants.all() if user.is_authenticated else False

    def validate_date(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Event date must be in the future.")
        return value

class EventDetailSerializer(EventSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields + ['participants']