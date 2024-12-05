from rest_framework import generics, permissions
from .models import Comment
from .serializers import CommentSerializer
from runups.models import RunUp

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        runup_id = self.kwargs.get('runup_id')
        return Comment.objects.filter(runup_id=runup_id)

    def perform_create(self, serializer):
        runup_id = self.kwargs.get('runup_id')
        runup = RunUp.objects.get(id=runup_id)
        serializer.save(author=self.request.user, runup=runup)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(
            queryset,
            pk=self.kwargs.get('pk'),
            runup__id=self.kwargs.get('runup_id')
        )
        self.check_object_permissions(self.request, obj)
        return obj