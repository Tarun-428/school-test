"""
Payment views.
- create_order: Creates a Razorpay order and saves a pending Transaction.
- verify_payment: Verifies the HMAC signature, updates paid_fee, marks success.
- TransactionListView: Admin-only list of all transactions.
"""
import hmac
import hashlib
import razorpay

from django.conf import settings
from django.db import transaction as db_transaction
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from students.models import Student
from .models import Transaction
from .serializers import (
    CreateOrderSerializer,
    VerifyPaymentSerializer,
    TransactionSerializer,
)

# Initialise Razorpay client once (re-used across requests)
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


class CreateOrderView(APIView):
    """
    POST /api/payments/create-order/
    Body: { student_id, amount }
    Returns: { order_id, amount, currency, razorpay_key_id }
    No auth required — parents use this.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        student_id = serializer.validated_data['student_id']
        amount = serializer.validated_data['amount']

        # Fetch student
        student = get_object_or_404(Student, student_id=student_id)

        # Prevent overpayment
        if amount > student.remaining_fee:
            return Response(
                {
                    'error': (
                        f"Amount ₹{amount} exceeds remaining fee ₹{student.remaining_fee}. "
                        "Cannot overpay."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if student.remaining_fee <= 0:
            return Response(
                {'error': 'All fees have already been paid.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Convert to paise (Razorpay uses smallest currency unit)
        amount_paise = int(amount * 100)

        # Create Razorpay order
        razorpay_order = razorpay_client.order.create({
            'amount': amount_paise,
            'currency': 'INR',
            'payment_capture': 1,  # auto-capture
            'notes': {
                'student_id': student_id,
                'student_name': student.name,
            },
        })

        # Save a pending transaction so we can verify later
        Transaction.objects.create(
            student=student,
            razorpay_order_id=razorpay_order['id'],
            amount=amount,
            status='pending',
        )

        return Response({
            'order_id': razorpay_order['id'],
            'amount': amount_paise,
            'currency': 'INR',
            'razorpay_key_id': settings.RAZORPAY_KEY_ID,
            'student_name': student.name,
        }, status=status.HTTP_201_CREATED)


class VerifyPaymentView(APIView):
    """
    POST /api/payments/verify/
    Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    Verifies HMAC signature, updates student paid_fee atomically.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyPaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order_id = serializer.validated_data['razorpay_order_id']
        payment_id = serializer.validated_data['razorpay_payment_id']
        signature = serializer.validated_data['razorpay_signature']

        # Fetch the pending transaction
        txn = get_object_or_404(Transaction, razorpay_order_id=order_id)

        # ── Signature verification ──────────────────────────────────────────
        # Razorpay signs: HMAC-SHA256(order_id + "|" + payment_id, secret)
        expected_sig = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode('utf-8'),
            f"{order_id}|{payment_id}".encode('utf-8'),
            hashlib.sha256,
        ).hexdigest()

        if not hmac.compare_digest(expected_sig, signature):
            txn.status = 'failed'
            txn.save(update_fields=['status'])
            return Response(
                {'error': 'Payment signature verification failed.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # ────────────────────────────────────────────────────────────────────

        # Use atomic transaction to prevent race conditions
        with db_transaction.atomic():
            student = txn.student
            # Re-check overpayment inside atomic block
            new_paid = student.paid_fee + txn.amount
            if new_paid > student.total_fee:
                txn.status = 'failed'
                txn.save(update_fields=['status'])
                return Response(
                    {'error': 'Payment would exceed total fee. Transaction rejected.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Update student paid_fee
            student.paid_fee = new_paid
            student.save(update_fields=['paid_fee'])

            # Mark transaction successful
            txn.razorpay_payment_id = payment_id
            txn.razorpay_signature = signature
            txn.status = 'success'
            txn.save(update_fields=['razorpay_payment_id', 'razorpay_signature', 'status'])

        return Response({
            'message': 'Payment verified and recorded successfully.',
            'payment_id': payment_id,
            'amount_paid': str(txn.amount),
            'remaining_fee': str(student.remaining_fee),
        }, status=status.HTTP_200_OK)


class TransactionListView(generics.ListAPIView):
    """
    GET /api/payments/transactions/
    Admin-only list of all transactions with optional student_id filter.
    """
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Transaction.objects.select_related('student').all()
        student_id = self.request.query_params.get('student_id')
        if student_id:
            qs = qs.filter(student__student_id=student_id)
        return qs
