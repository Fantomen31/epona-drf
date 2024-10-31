from django.db import models
from django.contrib.auth.models import User
from cities.models import City
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

class Club(models.Model):
    VISIBILITY_CHOICES = [
        ('PUBLIC', 'Public'),
        ('GHOST', 'Ghost'),
    ]

    MEMBERSHIP_TYPE = [
        ('OPEN', 'Open'),
        ('CLOSED', 'Closed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    main_city = models.ForeignKey(
        City, 
        on_delete=models.CASCADE,
        related_name='based_clubs'
    )
    sister_cities = models.ManyToManyField(
        City,
        related_name='sister_clubs',
        blank=True,
        
    )
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_clubs'
    )
    contact_email = models.EmailField()
    website = models.URLField(blank=True)
    social_links = models.JSONField(null=True, blank=True)  # Store multiple social media links
    visibility = models.CharField(
        max_length=10,
        choices=VISIBILITY_CHOICES,
        default='PUBLIC'
    )
    membership_type = models.CharField(
        max_length=10,
        choices=MEMBERSHIP_TYPE,
        default='OPEN'
    )
    weekly_meetup_schedule = models.JSONField(null=True, blank=True)  # Store schedule information
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def update_statistics(self):
        """Update club statistics"""
        if not hasattr(self, 'statistics'):
            ClubStatistics.objects.create(club=self)
        
        stats = self.statistics
        stats.total_members = self.memberships.count()
        stats.total_runups = self.runups.count()
        if self.runups.exists():
            stats.average_runup_attendance = (
                self.runups.annotate(
                    participant_count=models.Count('participants')
                ).aggregate(
                    avg_attendance=models.Avg('participant_count')
                )['avg_attendance'] or 0
            )
        stats.save()

    def get_pending_requests(self):
        """Get all pending join requests"""
        return self.join_requests.filter(status='PENDING')

    def process_join_request(self, request_id, action, processed_by):
        """Process a join request"""
        try:
            join_request = self.join_requests.get(id=request_id, status='PENDING')
            if action.upper() == 'APPROVE':
                join_request.status = 'APPROVED'
                ClubMembership.objects.create(
                    club=self,
                    user=join_request.user,
                    role='MEMBER'
                )
            elif action.upper() == 'REJECT':
                join_request.status = 'REJECTED'
            
            join_request.processed_by = processed_by
            join_request.processed_at = timezone.now()
            join_request.save()
            
            self.update_statistics()
            return True
        except ClubJoinRequest.DoesNotExist:
            return False

    def __str__(self):
        return self.name

class ClubMembership(models.Model):
    MEMBER_ROLES = [
        ('CREATOR', 'Creator'),
        ('ADMIN', 'Admin'),
        ('MEMBER', 'Member'),
    ]

    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='club_memberships')
    role = models.CharField(max_length=10, choices=MEMBER_ROLES, default='MEMBER')
    joined_at = models.DateTimeField(auto_now_add=True)
    total_distance = models.FloatField(default=0)  # Track member's total distance in club runs
    average_pace = models.FloatField(null=True, blank=True)  # Store as minutes per kilometer

    class Meta:
        unique_together = ('club', 'user')

    def __str__(self):
        return f"{self.user.username} - {self.club.name} ({self.role})"

class ClubJoinRequest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='join_requests')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='club_join_requests')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    processed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='processed_join_requests'
    )

    def clean(self):
        # Check if user is already a member
        if ClubMembership.objects.filter(club=self.club, user=self.user).exists():
            raise ValidationError("User is already a member of this club")
        
        # Check if there's already a pending request
        if ClubJoinRequest.objects.filter(
            club=self.club,
            user=self.user,
            status='PENDING'
        ).exclude(pk=self.pk).exists():
            raise ValidationError("A pending request already exists for this user")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('club', 'user', 'status')

    def __str__(self):
        return f"{self.user.username} - {self.club.name} ({self.status})"

class ClubStatistics(models.Model):
    club = models.OneToOneField(Club, on_delete=models.CASCADE, related_name='statistics')
    total_members = models.IntegerField(default=0)
    total_distance = models.FloatField(default=0)  # Total distance covered in all club runs
    weekly_distance = models.FloatField(default=0)  # Distance covered in the last 7 days
    monthly_distance = models.FloatField(default=0)  # Distance covered in the last 30 days
    yearly_distance = models.FloatField(default=0)  # Distance covered in the last 365 days
    average_pace = models.FloatField(null=True, blank=True)  # Average pace of all club runs
    total_runups = models.IntegerField(default=0)
    average_runup_attendance = models.FloatField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Statistics for {self.club.name}"

class ClubRunUp(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='runups')
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_time = models.DateTimeField()
    meeting_point = models.CharField(max_length=255)
    distance = models.FloatField(help_text="Distance in kilometers")
    pace = models.CharField(max_length=50)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_club_runups'
    )
    participants = models.ManyToManyField(
        User,
        related_name='participated_club_runups',
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.date_time <= timezone.now():
            raise ValidationError("RunUp date and time must be in the future")

    def __str__(self):
        return f"{self.club.name} - {self.title}"

    class Meta:
        ordering = ['date_time']



    @receiver(post_save, sender=ClubMembership)
    def update_club_stats_on_membership_change(sender, instance, created, **kwargs):
        """Update club statistics when a membership is created or updated"""
        instance.club.update_statistics()

    @receiver(post_delete, sender=ClubMembership)
    def update_club_stats_on_membership_delete(sender, instance, **kwargs):
         """Update club statistics when a membership is deleted"""
         instance.club.update_statistics()

    @receiver(post_save, sender=Club)
    def create_club_statistics(sender, instance, created, **kwargs):
        """Create club statistics when a new club is created"""
        if created:
            ClubStatistics.objects.create(club=instance)