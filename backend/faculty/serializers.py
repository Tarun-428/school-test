from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Faculty
        fields = [
            'id', 'name', 'photo', 'photo_url', 'subject', 'designation',
            'email', 'phone', 'bio', 'is_active', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.url
        return None
