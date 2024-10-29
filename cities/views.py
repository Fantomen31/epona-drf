from rest_framework import viewsets, permissions
from .models import City
from .serializers import CitySerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = City.objects.all()
        name = self.request.query_params.get('name', None)
        country = self.request.query_params.get('country', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        if country is not None:
            queryset = queryset.filter(country__icontains=country)
        return queryset