from django.urls import path
from . import views

urlpatterns = [
    path('runups/<int:runup_id>/comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('runups/<int:runup_id>/comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
]