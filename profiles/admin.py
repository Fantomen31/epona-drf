from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # Customize how profiles are displayed in the admin interface
    list_display = ('user', 'location', 'running_level')
    list_filter = ('running_level', 'location')
    search_fields = ('user__username', 'location')
    raw_id_fields = ('user',)

# This registers the Profile model with the admin site and customizes its display