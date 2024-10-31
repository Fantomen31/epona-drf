from django.urls import path
from . import views

urlpatterns = [
    path('', views.RouteList.as_view(), name='route-list'),
    path('<int:pk>/', views.RouteDetail.as_view(), name='route-detail'),
    path('<int:pk>/review/', views.RouteReview.as_view(), name='route-review'),
    path('by-city/', views.RoutesByCity.as_view(), name='routes-by-city'),
]