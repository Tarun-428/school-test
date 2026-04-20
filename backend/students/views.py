"""
Student views.
- Admin CRUD: IsAuthenticated
- Public search by student_id: no auth required
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

from .models import Student
from .serializers import StudentSerializer, StudentPublicSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_permissions(self):
        """
        Public GET by student_id → AllowAny
        Everything else → IsAuthenticated (admin JWT)
        """
        if self.action == 'search_by_id':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'], url_path='search')
    def search_by_id(self, request):
        """
        GET /api/students/search/?student_id=CBS001
        Used by parents to look up fee status without logging in.
        """
        student_id = request.query_params.get('student_id', '').strip()
        if not student_id:
            return Response(
                {'error': 'student_id query param is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        student = get_object_or_404(Student, student_id=student_id)
        serializer = StudentPublicSerializer(student)
        return Response(serializer.data)

    def get_serializer_class(self):
        return StudentSerializer
