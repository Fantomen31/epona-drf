from django.urls import path
from . import views

urlpatterns = [
    path('runups/<int:runup_id>/comments/', views.CommentList.as_view(), name='comment-list'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment-detail'),
    path('comments/<int:pk>/edit/', views.CommentEdit.as_view(), name='comment-edit'),
    path('comments/<int:pk>/delete/', views.CommentDelete.as_view(), name='comment-delete'),
    path('user/comments/', views.UserCommentList.as_view(), name='user-comment-list'),
]