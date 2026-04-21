from rest_framework import viewsets, permissions
from .models import Enquiry, Appointment
from .serializers import EnquirySerializer, AppointmentSerializer


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def get_permissions(self):
        # Anyone can create an enquiry; only admins can list/update/delete
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def get_permissions(self):
        # Anyone can book an appointment; only admins can list/update/delete
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
