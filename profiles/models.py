from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from cities.models import City

class Profile(models.Model):
    RUNNING_LEVEL_CHOICES = [
        (1, 'Novice'),
        (2, 'Beginner'),
        (3, 'Intermediate'),
        (4, 'Advanced'),
        (5, 'Professional'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, related_name='profiles')
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    running_level = models.IntegerField(choices=RUNNING_LEVEL_CHOICES, default=1)
    image = CloudinaryField('image', default='default_profile_pic')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

    class Meta:
        ordering = ['-created_at']