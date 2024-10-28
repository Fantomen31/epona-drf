from rest_framework import viewsets, permissions
from .models import Profile
from .serializers import ProfileSerializer
from epona_drf_api.permissions import IsOwnerOrReadOnly
from django_filters import rest_framework as filters


class ProfileFilter(filters.FilterSet):
    city = filters.NumberFilter(field_name="city__id")


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-created_at')
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Profile.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        return queryset.order_by('-created_at')
