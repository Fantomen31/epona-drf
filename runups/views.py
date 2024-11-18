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
