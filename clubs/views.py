from rest_framework import generics, permissions, filters, status
from rest_framework.decorators import api_view, permission_classes
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

class ClubList(generics.ListCreateAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsClubAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['main_city', 'visibility', 'membership_type']
    search_fields = ['name', 'description', 'main_city__name']
    ordering_fields = ['created_at', 'name']

    def get_queryset(self):
        queryset = Club.objects.all()
        if self.request.user.is_authenticated:
            return queryset.filter(visibility='PUBLIC')
        return queryset.filter(visibility='PUBLIC')

class ClubDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsClubAdminOrReadOnly]

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def request_membership(request, pk):
    try:
        club = Club.objects.get(pk=pk)
    except Club.DoesNotExist:
        return Response({'error': 'Club not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ClubJoinRequestCreateSerializer(data={'club': club.id}, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'Membership request sent'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsClubAdminOrReadOnly])
def process_join_request(request, pk):
    try:
        club = Club.objects.get(pk=pk)
    except Club.DoesNotExist:
        return Response({'error': 'Club not found'}, status=status.HTTP_404_NOT_FOUND)

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

class ClubRunUpList(generics.ListCreateAPIView):
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

class ClubRunUpDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClubRunUpSerializer
    permission_classes = [permissions.IsAuthenticated, IsClubMember]

    def get_queryset(self):
        return ClubRunUp.objects.filter(club_id=self.kwargs['club_pk'])

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsClubMember])
def join_runup(request, club_pk, pk):
    try:
        runup = ClubRunUp.objects.get(pk=pk, club_id=club_pk)
    except ClubRunUp.DoesNotExist:
        return Response({'error': 'RunUp not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user not in runup.participants.all():
        runup.participants.add(request.user)
        serializer = ClubRunUpSerializer(runup)
        return Response(serializer.data)
    return Response(
        {'detail': 'Already registered for this RunUp'},
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsClubMember])
def leave_runup(request, club_pk, pk):
    try:
        runup = ClubRunUp.objects.get(pk=pk, club_id=club_pk)
    except ClubRunUp.DoesNotExist:
        return Response({'error': 'RunUp not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user in runup.participants.all():
        runup.participants.remove(request.user)
        serializer = ClubRunUpSerializer(runup)
        return Response(serializer.data)
    return Response(
        {'detail': 'Not registered for this RunUp'},
        status=status.HTTP_400_BAD_REQUEST
    )