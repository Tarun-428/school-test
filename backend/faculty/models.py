from django.db import models
import cloudinary.models


class Faculty(models.Model):
    name = models.CharField(max_length=150)
    photo = cloudinary.models.CloudinaryField('image', blank=True, null=True)
    subject = models.CharField(max_length=100)
    designation = models.CharField(max_length=100, blank=True, default='Teacher')
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15)
    bio = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} — {self.subject}"

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Faculty'
