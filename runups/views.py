from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import RunUp
from .serializers import RunUpSerializer
from django.db.models import Q

class RunUpViewSet(viewsets.ModelViewSet):
    queryset = RunUp.objects.all()
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
                #Q(visibility='CLOSED', host__in=user.following.all()) | # Commented out untill following function is built
                Q(host=user)
            ).distinct()
        else:
            queryset = queryset.filter(visibility='OPEN')

        return queryset

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        runup = self.get_object()
        if request.user in runup.participants.all():
            return Response({'status': 'already joined'}, status=status.HTTP_400_BAD_REQUEST)
        runup.participants.add(request.user)
        return Response({'status': 'joined'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        runup = self.get_object()
        if request.user not in runup.participants.all():
            return Response({'status': 'not joined'}, status=status.HTTP_400_BAD_REQUEST)
        runup.participants.remove(request.user)
        return Response({'status': 'left'}, status=status.HTTP_200_OK)
