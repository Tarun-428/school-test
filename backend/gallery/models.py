from django.db import models
import cloudinary.models


class GalleryImage(models.Model):
    title = models.CharField(max_length=200, blank=True, default='')
    image = cloudinary.models.CloudinaryField('image')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Image #{self.pk}"

    class Meta:
        ordering = ['-uploaded_at']
