from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Route, RouteReview
from .serializers import RouteSerializer, RouteReviewSerializer
from epona_drf_api.permissions import IsOwnerOrReadOnly

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['city', 'creator', 'safety_rating', 'difficulty_rating']
    ordering_fields = ['distance', 'pace', 'created_at', 'safety_rating', 'difficulty_rating']

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.profile)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def review(self, request, pk=None):
        route = self.get_object()
        serializer = RouteReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user.profile, route=route)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def by_city(self, request):
        city_name = request.query_params.get('city', None)
        if city_name is not None:
            routes = Route.objects.filter(city__name=city_name)
            serializer = self.get_serializer(routes, many=True)
            return Response(serializer.data)
        return Response({"error": "City parameter is required"}, status=status.HTTP_400_BAD_REQUEST)