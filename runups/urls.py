from django.urls import path
from .views import RunUpList, RunUpDetail, RunUpJoin, RunUpLeave

urlpatterns = [
    path('', RunUpList.as_view(), name='runup-list'),
    path('<int:pk>/', RunUpDetail.as_view(), name='runup-detail'),
    path('<int:pk>/join/', RunUpJoin.as_view(), name='runup-join'),
    path('<int:pk>/leave/', RunUpLeave.as_view(), name='runup-leave'),
]