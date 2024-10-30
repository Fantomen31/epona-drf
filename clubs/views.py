from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from .models import Club, ClubMembership, ClubJoinRequest, ClubRunUp
from .serializers import (
    ClubSerializer, ClubDetailSerializer, ClubRunUpSerializer,
    ClubJoinRequestSerializer, ClubMembershipSerializer
)

class IsClubAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not request.user.is_authenticated:
            return False

        membership = obj.memberships.filter(user=request.user).first()
        return membership and membership.role in ['CREATOR', 'ADMIN']

class IsClubMemberOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS and obj.visibility == 'PUBLIC':
            return True
        
        if not request.user.is_authenticated:
            return False

        return obj.memberships.filter(user=request.user).exists()

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsClubAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['main_city', 'visibility', 'membership_type']
    search_fields = ['name', 'description', 'main_city__name']
    ordering_fields = ['created_at', 'name', 'statistics__total_members']

    def get_queryset(self):
        queryset = Club.objects.all()
        if self.request.user.is_authenticated:
            return queryset.filter(
                Q(visibility='PUBLIC') |
                Q(memberships__user=self.request.user)
            ).distinct()
        return queryset.filter(visibility='PUBLIC')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ClubDetailSerializer
        return ClubSerializer

    def perform_create(self, serializer):
        club = serializer.save(creator=self.request.user)
        ClubMembership.objects.create(
            club=club,
            user=self.request.user,
            role='CREATOR'
        )

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        club = self.get_object()
        
        if club.memberships.filter(user=request.user).exists():
            return Response(
                {'detail': 'Already a member'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if club.membership_type == 'CLOSED':
            join_request, created = ClubJoinRequest.objects.get_or_create(
                club=club,
                user=request.user,
                defaults={'status': 'PENDING'}
            )
            return Response(
                {'detail': 'Join request submitted'},
                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
            )

        ClubMembership.objects.create(
            club=club,
            user=request.user,
            role='MEMBER'
        )
        return Response({'detail': 'Joined successfully'})

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        club = self.get_object()
        membership = club.memberships.filter(user=request.user).first()
        
        if not membership:
            return Response(
                {'detail': 'Not a member'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if membership.role == 'CREATOR':
            return Response(
                {'detail': 'Creator cannot leave the club'},
                status=status.HTTP_400_BAD_REQUEST
            )

        membership.delete()
        return Response({'detail': 'Left successfully'})

    @action(detail=True, methods=['post'])
    def process_request(self, request, pk=None):
        club = self.get_object()
        membership = club.memberships.filter(user=request.user).first()
        
        if not membership or membership.role not in ['CREATOR', 'ADMIN']:
            return Response(
                {'detail': 'Not authorized'},
                status=status.HTTP_403_FORBIDDEN
            )

        join_request = club.join_requests.get(pk=request.data.get('request_id'))
        action = request.data.get('action')

        if action == 'approve':
            join_request.status = 'APPROVED'
            join_request.processed_by = request.user
            join_request.processed_at = timezone.now()
            join_request.save()

            ClubMembership.objects.create(
                club=club,
                user=join_request.user,
                role='MEMBER'
            )
        elif action == 'reject':
            join_request.status = 'REJECTED'
            join_request.processed_by = request.user
            join_request.processed_at = timezone.now()
            join_request.save()
        
        return Response({'detail': f'Request {action}d successfully'})

class ClubRunUpViewSet(viewsets.ModelViewSet):
    serializer_class = ClubRunUpSerializer
    permission_classes = [permissions.IsAuthenticated, IsClubMemberOrReadOnly]

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
        return Response({'detail': 'Joined RunUp successfully'})

    @action(detail=True, methods=['post'])
    def leave_runup(self, request, club_pk=None, pk=None):
        runup = self.get_object()
        if request.user in runup.participants.all():
            runup.participants.remove(request.user)
        return Response({'detail': 'Left RunUp successfully'})