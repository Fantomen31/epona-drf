from django.urls import path
from . import views

urlpatterns = [
    path('', views.CityList.as_view(), name='city-list'),
    path('<int:pk>/', views.CityDetail.as_view(), name='city-detail'),
]