"""
URL configuration for epona_drf_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from profiles.views import ProfileViewSet
from runups.views import RunUpViewSet
from cities.views import CityViewSet
from events.views import EventViewSet, EventRaceViewSet
from clubs.views import ClubViewSet, ClubRunUpViewSet


# Create a default router
router = DefaultRouter()

# Register viewsets with the default router
router.register(r'profiles', ProfileViewSet)
router.register(r'runups', RunUpViewSet)
router.register(r'cities', CityViewSet)
router.register(r'events', EventViewSet)
router.register(r'clubs', ClubViewSet)

# Create a nested router for event races
events_router = routers.NestedSimpleRouter(router, r'events', lookup='event')
events_router.register(r'races', EventRaceViewSet, basename='event-races')

# Create a nested router for club runups
clubs_router = routers.NestedSimpleRouter(router, r'clubs', lookup='club')
clubs_router.register(r'runups', ClubRunUpViewSet, basename='club-runups')

# Combine all router URLs
all_router_urls = router.urls + events_router.urls + clubs_router.urls 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include((all_router_urls, 'api'))),
    path('api/routes/', include('routes.urls')),  
]