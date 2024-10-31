from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model
from cities.models import City
from cloudinary.models import CloudinaryField

User = get_user_model()

class Route(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    distance = models.FloatField(help_text="Distance in kilometers")
    pace = models.FloatField(help_text="Average pace in minutes per kilometer")
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_routes')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='routes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = CloudinaryField('image', default='route_default_iwvigb', null=True, blank=True)
    safety_rating = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True
    )
    difficulty_rating = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title

class RouteReview(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    review_rating = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True
    )

    class Meta:
        unique_together = ('route', 'user')

    def __str__(self):
        return f"Review by {self.user.username} for {self.route.title}"