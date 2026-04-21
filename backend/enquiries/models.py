from django.db import models


class Enquiry(models.Model):
    SOURCE_CHOICES = [
        ('website', 'Website Form'),
        ('whatsapp', 'WhatsApp'),
        ('phone', 'Phone Call'),
        ('walk_in', 'Walk-in'),
    ]
    COURSE_INTEREST_CHOICES = [
        ('iit_jee', 'IIT-JEE'),
        ('neet_ug', 'NEET UG'),
        ('foundation', 'Foundation'),
        ('scholarship', 'Scholarship'),
        ('general', 'General Enquiry'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15)
    course_interest = models.CharField(max_length=30, choices=COURSE_INTEREST_CHOICES, default='general')
    message = models.TextField(blank=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='website')
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.course_interest}"

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Enquiries'


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15)
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    course_interest = models.CharField(max_length=30, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} — {self.preferred_date} {self.preferred_time}"

    class Meta:
        ordering = ['-preferred_date', '-preferred_time']
