from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Club, ClubMembership, ClubJoinRequest, ClubRunUp
from .serializers import (
    ClubSerializer, ClubDetailSerializer, ClubRunUpSerializer,
    ClubJoinRequestSerializer, ClubMembershipSerializer,
    ClubJoinRequestCreateSerializer, ClubJoinRequestProcessSerializer
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

    @action(detail=True, methods=['POST'])
    def request_membership(self, request, pk=None):
        club = self.get_object()
        serializer = ClubJoinRequestCreateSerializer(data={'club': club.id}, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'Membership request sent'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'])
    def process_join_request(self, request, pk=None):
        club = self.get_object()
        serializer = ClubJoinRequestProcessSerializer(data=request.data, context={'request': request, 'club': club})
        if serializer.is_valid():
            action = serializer.validated_data['action']
            join_request_id = request.data.get('request_id')
            try:
                join_request = club.join_requests.get(id=join_request_id, status='PENDING')
            except ClubJoinRequest.DoesNotExist:
                return Response({'status': 'Join request not found'}, status=status.HTTP_404_NOT_FOUND)

            if action == 'APPROVE':
                ClubMembership.objects.create(club=club, user=join_request.user, role='MEMBER')
                join_request.status = 'APPROVED'
            else:
                join_request.status = 'REJECTED'

            join_request.processed_by = request.user
            join_request.save()

            if hasattr(club, 'statistics'):
                club.statistics.total_members = club.memberships.count()
                club.statistics.save()

            return Response({'status': f'Join request {action.lower()}ed'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClubRunUpViewSet(viewsets.ModelViewSet):
    serializer_class = ClubRunUpSerializer
    permission_classes = [permissions.IsAuthenticated, IsClubMember]

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