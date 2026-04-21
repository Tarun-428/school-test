from django.contrib import admin
from .models import Enquiry, Appointment


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'course_interest', 'source', 'is_resolved', 'created_at')
    list_filter = ('course_interest', 'source', 'is_resolved')
    search_fields = ('name', 'phone', 'email')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'preferred_date', 'preferred_time', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('name', 'phone', 'email')
