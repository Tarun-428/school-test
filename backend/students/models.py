"""
Student model — holds all student info including fee tracking.
remaining_fee is auto-calculated as total_fee - paid_fee.
"""
from django.db import models
import cloudinary.models


class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=150)
    profile_photo = cloudinary.models.CloudinaryField(
        'image', blank=True, null=True
    )
    student_class = models.CharField(max_length=20)
    section = models.CharField(max_length=5, blank=True, default='A')
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15)
    parent_name = models.CharField(max_length=150, blank=True)
    address = models.TextField(blank=True)

    # Fee fields (stored in paise / rupees based on your choice – we use rupees)
    total_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def remaining_fee(self):
        """Auto-calculated: never negative."""
        remaining = self.total_fee - self.paid_fee
        return max(remaining, 0)

    def __str__(self):
        return f"{self.name} ({self.student_id})"

    class Meta:
        ordering = ['student_class', 'name']
