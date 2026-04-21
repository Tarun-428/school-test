from rest_framework import serializers
from .models import Enquiry, Appointment


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'
        read_only_fields = ('created_at', 'is_resolved')


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'status')
