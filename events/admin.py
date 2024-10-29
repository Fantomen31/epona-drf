from django.contrib import admin
from .models import Event, EventRace

admin.site.register(Event, EventRace)