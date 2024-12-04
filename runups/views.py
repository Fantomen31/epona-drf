from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RunUp
from .serializers import RunUpSerializer
from django.db.models import Q

class RunUpList(generics.ListCreateAPIView):
    serializer_class = RunUpSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    def get_queryset(self):
        queryset = RunUp.objects.all()
        user = self.request.user
        city = self.request.query_params.get('city', None)

        if city:
            queryset = queryset.filter(city=city)

        if user.is_authenticated:
            queryset = queryset.filter(
                Q(visibility='OPEN') |
                #Q(visibility='CLOSED', host__in=user.following.all()) | # Commented out until following function is built
                Q(host=user)
            ).distinct()
        else:
            queryset = queryset.filter(visibility='OPEN')

        return queryset

class RunUpDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RunUp.objects.all()
    serializer_class = RunUpSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

class RunUpJoin(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            runup = RunUp.objects.get(pk=pk)
        except RunUp.DoesNotExist:
            return Response({'status': 'runup not found'}, status=status.HTTP_404_NOT_FOUND)

        if request.user in runup.participants.all():
            return Response({'status': 'already joined'}, status=status.HTTP_400_BAD_REQUEST)
        
        runup.participants.add(request.user)
        return Response({'status': 'joined'}, status=status.HTTP_200_OK)

class RunUpLeave(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            runup = RunUp.objects.get(pk=pk)
        except RunUp.DoesNotExist:
            return Response({'status': 'runup not found'}, status=status.HTTP_404_NOT_FOUND)

        if request.user not in runup.participants.all():
            return Response({'status': 'not joined'}, status=status.HTTP_400_BAD_REQUEST)
        
        runup.participants.remove(request.user)
        return Response({'status': 'left'}, status=status.HTTP_200_OK)
