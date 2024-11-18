from django.urls import path
from . import views

urlpatterns = [
    path('', views.EventList.as_view(), name='event-list'),
    path('<int:pk>/', views.EventDetail.as_view(), name='event-detail'),
    path('<int:pk>/register/', views.event_register, name='event-register'),
    path('<int:pk>/unregister/', views.event_unregister, name='event-unregister'),
    path('<int:event_pk>/races/', views.EventRaceList.as_view(), name='event-race-list'),
    path('<int:event_pk>/races/<int:pk>/', views.EventRaceDetail.as_view(), name='event-race-detail'),
]