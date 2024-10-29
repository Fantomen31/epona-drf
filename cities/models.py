from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    weather_info = models.TextField(blank=True)
    timezone = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Cities"
        unique_together = ['name', 'country']
        ordering = ['country', 'name']

    def __str__(self):
        return f"{self.name}, {self.country}"

    @property
    def runners_count(self):
        return self.profiles.count()

    @property
    def running_clubs_count(self):
        return self.clubs.count()

    @property
    def races_count(self):
        return self.events.count()