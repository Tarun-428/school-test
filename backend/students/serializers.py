from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    remaining_fee = serializers.ReadOnlyField()
    profile_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'student_id', 'name', 'profile_photo', 'profile_photo_url',
            'student_class', 'section', 'email', 'phone', 'parent_name',
            'address', 'total_fee', 'paid_fee', 'remaining_fee',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_profile_photo_url(self, obj):
        """Return the Cloudinary URL for the profile photo."""
        if obj.profile_photo:
            return obj.profile_photo.url
        return None

    def validate(self, data):
        """Ensure paid_fee never exceeds total_fee."""
        paid = data.get('paid_fee', getattr(self.instance, 'paid_fee', 0))
        total = data.get('total_fee', getattr(self.instance, 'total_fee', 0))
        if paid > total:
            raise serializers.ValidationError(
                "paid_fee cannot exceed total_fee."
            )
        return data


class StudentPublicSerializer(serializers.ModelSerializer):
    """Minimal serializer for parent fee-search (no sensitive admin data)."""
    remaining_fee = serializers.ReadOnlyField()
    profile_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'student_id', 'name', 'student_class', 'section',
            'profile_photo_url', 'total_fee', 'paid_fee', 'remaining_fee',
        ]

    def get_profile_photo_url(self, obj):
        if obj.profile_photo:
            return obj.profile_photo.url
        return None
