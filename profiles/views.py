from rest_framework import viewsets, permissions
from .models import Profile
from .serializers import ProfileSerializer, ProfileCreateUpdateSerializer
from epona_drf_api.permissions import IsOwnerOrReadOnly

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProfileCreateUpdateSerializer
        return ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)