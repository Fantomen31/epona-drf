from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from cities.models import City
#from clubs.models import Club

class Event(models.Model):
    EVENT_TYPES = [
        ('MARATHON', 'Marathon'),
        ('HALF_MARATHON', 'Half Marathon'),
        ('10K', '10K'),
        ('5K', '5K'),
        ('OTHER', 'Other'),
    ]
    
    DIFFICULTY_LEVELS = [
        (1, 'Easy'),
        (2, 'Moderate'),
        (3, 'Challenging'),
        (4, 'Hard'),
        (5, 'Expert'),
    ]

    name = models.CharField(max_length=255)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='events')
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    date = models.DateTimeField()
    description = models.TextField()
    registration_url = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    difficulty_level = models.IntegerField(choices=DIFFICULTY_LEVELS, validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    organizers = models.ManyToManyField(User, related_name='organized_events')
    participants = models.ManyToManyField(User, related_name='participated_events', blank=True)
    #clubs = models.ManyToManyField(Club, related_name='club_events', blank=True)

    def register_participant(self, user):
        if user not in self.participants.all():
            self.participants.add(user)
            return True
        return False

    def unregister_participant(self, user):
        if user in self.participants.all():
            self.participants.remove(user)
            return True
        return False

    def __str__(self):
        return f"{self.name} - {self.city.name}, {self.city.country}"

    def clean(self):
        if self.date <= timezone.now():
            raise ValidationError("Event date must be in the future.")

    class Meta:
        ordering = ['date']
        indexes = [
            models.Index(fields=['city', 'date']),
            models.Index(fields=['event_type']),
        ]

class EventRace(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='races')
    race_type = models.CharField(max_length=20, choices=Event.EVENT_TYPES)
    start_time = models.TimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.event.name} - {self.get_race_type_display()}"

    class Meta:
        unique_together = ('event', 'race_type')