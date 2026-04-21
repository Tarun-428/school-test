from django.db import models


class Course(models.Model):
    CATEGORY_CHOICES = [
        ('iit_jee', 'IIT-JEE'),
        ('neet_ug', 'NEET UG'),
        ('foundation', 'Foundation'),
        ('scholarship', 'Scholarship Prep'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='other')
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    eligibility = models.TextField(blank=True)
    duration = models.CharField(max_length=100, blank=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['category', 'name']
