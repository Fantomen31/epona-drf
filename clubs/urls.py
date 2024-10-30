from django.urls import path, include
from rest_framework_nested import routers
from .views import ClubViewSet, ClubRunUpViewSet

router = routers.DefaultRouter()
router.register(r'clubs', ClubViewSet)

clubs_router = routers.NestedSimpleRouter(router, r'clubs', lookup='club')
clubs_router.register(r'runups', ClubRunUpViewSet, basename='club-runups')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(clubs_router.urls)),
]