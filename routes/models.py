from django.db import models
from django.contrib.auth import get_user_model
from profiles.models import Profile
from cities.models import City
from cloudinary.models import CloudinaryField

User = get_user_model()

class Route(models.Model):
    RATING_CHOICES = [
        (1.00, '1'), (1.25, '1.25'), (1.50, '1.5'), (1.75, '1.75'),
        (2.00, '2'), (2.25, '2.25'), (2.50, '2.5'), (2.75, '2.75'),
        (3.00, '3'), (3.25, '3.25'), (3.50, '3.5'), (3.75, '3.75'),
        (4.00, '4'), (4.25, '4.25'), (4.50, '4.5'), (4.75, '4.75'),
        (5.00, '5'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    distance = models.FloatField(help_text="Distance in kilometers")
    pace = models.CharField(max_length=50, help_text="Average pace (e.g., '5:30 min/km')")
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='created_routes')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='routes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = CloudinaryField('image', default='route_default_iwvigb', null=True, blank=True)
    safety_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        choices=RATING_CHOICES,

        null=True,
        blank=True
    )
    difficulty_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        choices=RATING_CHOICES,

        null=True,
        blank=True
    )

    def __str__(self):
        return self.title

class RouteReview(models.Model):
    RATING_CHOICES = [
        (1.00, '1'), (1.25, '1.25'), (1.50, '1.5'), (1.75, '1.75'),
        (2.00, '2'), (2.25, '2.25'), (2.50, '2.5'), (2.75, '2.75'),
        (3.00, '3'), (3.25, '3.25'), (3.50, '3.5'), (3.75, '3.75'),
        (4.00, '4'), (4.25, '4.25'), (4.50, '4.5'), (4.75, '4.75'),
        (5.00, '5'),
    ]

    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    review_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        choices=RATING_CHOICES,

        null=True,
        blank=True
    )

    class Meta:
        unique_together = ('route', 'user')

    def __str__(self):
        return f"Review by {self.user.user.username} for {self.route.title}"