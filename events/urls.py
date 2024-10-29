from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import EventViewSet, EventRaceViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)

events_router = routers.NestedSimpleRouter(router, r'events', lookup='event')
events_router.register(r'races', EventRaceViewSet, basename='event-races')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(events_router.urls)),
]