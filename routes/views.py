from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Route, RouteReview

from .serializers import RouteSerializer, RouteReviewSerializer
from epona_drf_api.permissions import IsOwnerOrReadOnly

class RouteList(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['city', 'creator', 'safety_rating', 'difficulty_rating']
    ordering_fields = ['distance', 'pace', 'created_at', 'safety_rating', 'difficulty_rating']

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.profile)

class RouteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class RouteReview(generics.CreateAPIView):
    serializer_class = RouteReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        route_id = self.kwargs.get('pk')
        route = generics.get_object_or_404(Route, id=route_id)
    
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user.profile, route=route)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RoutesByCity(generics.ListAPIView):
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        city_name = self.request.query_params.get('city', None)
        if city_name is not None:
            return Route.objects.filter(city__name=city_name)
        return Route.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"error": "City parameter is required or no routes found for the given city"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)