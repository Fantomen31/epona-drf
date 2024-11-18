from django.urls import path
from . import views

urlpatterns = [
    path('', views.ClubList.as_view(), name='club-list'),
    path('<int:pk>/', views.ClubDetail.as_view(), name='club-detail'),
    path('<int:pk>/request-membership/', views.request_membership, name='club-request-membership'),
    path('<int:pk>/process-join-request/', views.process_join_request, name='club-process-join-request'),
    path('<int:club_pk>/runups/', views.ClubRunUpList.as_view(), name='club-runup-list'),
    path('<int:club_pk>/runups/<int:pk>/', views.ClubRunUpDetail.as_view(), name='club-runup-detail'),
    path('<int:club_pk>/runups/<int:pk>/join/', views.join_runup, name='club-runup-join'),
    path('<int:club_pk>/runups/<int:pk>/leave/', views.leave_runup, name='club-runup-leave'),
]