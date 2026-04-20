from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Faculty
from .serializers import FacultySerializer


class FacultyViewSet(viewsets.ModelViewSet):
    """
    list/retrieve → public (no auth)
    create/update/delete → admin JWT required
    """
    queryset = Faculty.objects.filter(is_active=True)
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
