from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer

    def get_permissions(self):
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = BlogPost.objects.all()
        if not (self.request.user and self.request.user.is_authenticated):
            qs = qs.filter(is_published=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs

    @action(detail=False, methods=['get'])
    def categories(self, request):
        return Response(dict(BlogPost.CATEGORY_CHOICES))
