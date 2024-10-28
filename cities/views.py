from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import City
from .serializers import CitySerializer, CityDetailSerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'country']
    ordering_fields = ['name', 'country', 'created_at', 'race_count']
    filterset_fields = ['country']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CityDetailSerializer
        return CitySerializer

    @action(detail=True, methods=['get'])
    def active_runups(self, request, pk=None):
        city = self.get_object()
        active_runups = city.active_runups()
        data = [{
            'id': runup.id,
            'host': runup.host.username,
            'description': runup.description,
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
        return Response(data)

    @action(detail=True, methods=['get'])
    def profiles(self, request, pk=None):
        city = self.get_object()
        profiles = city.profiles.all()
        data = [{
            'id': profile.id,
            'user': profile.user.username,
        } for profile in profiles]
        return Response(data)

    @action(detail=True, methods=['get'])
    def races(self, request, pk=None):
        city = self.get_object()
        races = city.races.all()
        data = [{
            'id': race.id,
            'name': race.name,
            'date': race.date,
            # Add other race fields as needed
        } for race in races]
        return Response(data)