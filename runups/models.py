from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from cities.models import City

class RunUp(models.Model):
    VISIBILITY_CHOICES = [
        ('CLOSED', 'Closed - Only visible to connected users'),
        ('OPEN', 'Open - Visible to anyone in the same city'),
    ]

    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_runups')
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    visibility = models.CharField(max_length=6, choices=VISIBILITY_CHOICES, default='CLOSED')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='runups')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    participants = models.ManyToManyField(User, related_name='joined_runups', blank=True)
    
    distance = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(25)],
        help_text="Distance in kilometers (1-25 km)"
    )
    pace = models.CharField(max_length=10, blank=True, null=True,
        help_text="Expected pace (e.g., '5:30/km')"
    )
    duration = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Expected duration in minutes"
    )
    route = models.TextField(blank=True, null=True,
        help_text="Description or link to the planned route"
    )

    def __str__(self):
        return f"RunUp by {self.host.username} on {self.date_time.date()}"

