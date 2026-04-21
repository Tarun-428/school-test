from rest_framework import viewsets, permissions
from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = Course.objects.all()
        if not (self.request.user and self.request.user.is_authenticated):
            qs = qs.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs
