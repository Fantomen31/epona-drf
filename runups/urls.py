from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RunUpViewSet

router = DefaultRouter()
router.register(r'runups', RunUpViewSet)

urlpatterns = [
    path('', include(router.urls)),
]