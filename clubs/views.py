from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Club, ClubMembership, ClubJoinRequest, ClubRunUp
from .serializers import (
    ClubSerializer, ClubDetailSerializer, ClubRunUpSerializer,
    ClubJoinRequestSerializer, ClubMembershipSerializer
)

class IsClubMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if hasattr(obj, 'club'):  # For ClubRunUp objects
            club = obj.club
        else:  # For Club objects
            club = obj

        return club.memberships.filter(user=request.user).exists()

class IsClubAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not request.user.is_authenticated:
            return False

        if hasattr(obj, 'club'):
            club = obj.club
        else:
            club = obj

        membership = club.memberships.filter(user=request.user).first()
        return membership and membership.role in ['CREATOR', 'ADMIN']

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsClubAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['main_city', 'visibility', 'membership_type']
    search_fields = ['name', 'description', 'main_city__name']
    ordering_fields = ['created_at', 'name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ClubDetailSerializer
        return ClubSerializer

    def get_queryset(self):
        queryset = Club.objects.all()
        if self.request.user.is_authenticated:
            return queryset.filter(visibility='PUBLIC')
        return queryset.filter(visibility='PUBLIC')

class ClubRunUpViewSet(viewsets.ModelViewSet):
    serializer_class = ClubRunUpSerializer
    permission_classes = [permissions.IsAuthenticated] #Removed IsClubMember for testing purposes.  May need to be reinstated.

    def get_queryset(self):
        return ClubRunUp.objects.filter(club_id=self.kwargs['club_pk'])

    def perform_create(self, serializer):
        club = Club.objects.get(pk=self.kwargs['club_pk'])
        membership = club.memberships.filter(user=self.request.user).first()
        
        if not membership or membership.role not in ['CREATOR', 'ADMIN']:
            raise permissions.PermissionDenied("Only club admins can create RunUps")
        
        serializer.save(club=club, created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def join_runup(self, request, club_pk=None, pk=None):
        runup = self.get_object()
        if request.user not in runup.participants.all():
            runup.participants.add(request.user)
            serializer = self.get_serializer(runup)
            return Response(serializer.data)
        return Response(
            {'detail': 'Already registered for this RunUp'},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def leave_runup(self, request, club_pk=None, pk=None):
        runup = self.get_object()
        if request.user in runup.participants.all():
            runup.participants.remove(request.user)
            serializer = self.get_serializer(runup)
            return Response(serializer.data)
        return Response(
            {'detail': 'Not registered for this RunUp'},
            status=status.HTTP_400_BAD_REQUEST
        )



    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['show_join_button'] = True
        return context