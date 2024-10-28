from django.db import models
from cloudinary.models import CloudinaryField

class City(models.Model):
    name = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=100)
    image = CloudinaryField('image', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}, {self.country}"

    @property
    def runners_count(self):
        return self.profiles.count()

    @property
    def runningclubs_count(self):
        return self.runningclubs.count()

    @property
    def race_count(self):
        return self.races.count()

    def active_runups(self):
        return self.runups.filter(is_active=True)

    class Meta:
        verbose_name_plural = "Cities"
        ordering = ['name', 'country']