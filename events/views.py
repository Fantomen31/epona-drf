from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event, EventRace
from .serializers import EventSerializer, EventDetailSerializer, EventRaceSerializer

class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user in obj.organizers.all() or request.user.is_staff

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOrganizerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'event_type', 'date', 'difficulty_level']
    search_fields = ['name', 'description', 'city__name', 'city__country', 'event_type']
    ordering_fields = ['date', 'price', 'difficulty_level', 'event_type']

    @action(detail=True, methods=['post'])
    def register(self, request, pk=None):
        event = self.get_object()
        if event.register_participant(request.user):
            return Response({'status': 'registered'})
        return Response({'status': 'already registered'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def unregister(self, request, pk=None):
        event = self.get_object()
        if event.unregister_participant(request.user):
            return Response({'status': 'unregistered'})
        return Response({'status': 'not registered'}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return EventDetailSerializer
        return EventSerializer

    def perform_create(self, serializer):
        serializer.save(organizers=[self.request.user])

class EventRaceViewSet(viewsets.ModelViewSet):
    queryset = EventRace.objects.all()
    serializer_class = EventRaceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOrganizerOrReadOnly]

    def get_queryset(self):
        return EventRace.objects.filter(event_id=self.kwargs['event_pk'])

    def perform_create(self, serializer):
        event = Event.objects.get(pk=self.kwargs['event_pk'])
        serializer.save(event=event)