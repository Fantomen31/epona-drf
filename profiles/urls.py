from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

# Create a router and register our viewset with it
router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]