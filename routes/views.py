from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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

class RouteReviewCreateUpdateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = RouteReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        route_id = self.kwargs.get('pk')
        user = self.request.user.profile
        try:
            return RouteReview.objects.get(route_id=route_id, user=user)
        except RouteReview.DoesNotExist:
            return None

    def create(self, request, *args, **kwargs):
        route_id = self.kwargs.get('pk')
        route = generics.get_object_or_404(Route, id=route_id)
        existing_review = self.get_object()

        if existing_review:
            serializer = self.get_serializer(existing_review, data=request.data, partial=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        route_id = self.kwargs.get('pk')
        route = generics.get_object_or_404(Route, id=route_id)
        serializer.save(user=self.request.user.profile, route=route)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

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

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_review_exists(request, pk):
    review_exists = RouteReview.objects.filter(user=request.user.profile, route_id=pk).exists()
    return Response({'exists': review_exists})