from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_id = serializers.CharField(source='student.student_id', read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'id', 'student_id', 'student_name', 'razorpay_order_id',
            'razorpay_payment_id', 'amount', 'status', 'created_at',
        ]
        read_only_fields = fields


class CreateOrderSerializer(serializers.Serializer):
    """Validates the incoming request to create a Razorpay order."""
    student_id = serializers.CharField(max_length=20)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=1)


class VerifyPaymentSerializer(serializers.Serializer):
    """Validates the Razorpay callback data from frontend."""
    razorpay_order_id = serializers.CharField()
    razorpay_payment_id = serializers.CharField()
    razorpay_signature = serializers.CharField()
