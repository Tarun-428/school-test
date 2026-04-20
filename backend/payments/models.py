from django.db import models
from students.models import Student


class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]

    student = models.ForeignKey(
        Student, on_delete=models.PROTECT, related_name='transactions'
    )
    razorpay_order_id = models.CharField(max_length=100, unique=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, default='')
    razorpay_signature = models.CharField(max_length=512, blank=True, default='')
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # in INR
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.name} | ₹{self.amount} | {self.status}"

    class Meta:
        ordering = ['-created_at']
