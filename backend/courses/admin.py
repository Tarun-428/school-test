from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'duration', 'fee', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'description')
