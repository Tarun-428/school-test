from django.urls import path
from .views import CreateOrderView, VerifyPaymentView, TransactionListView

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('verify/', VerifyPaymentView.as_view(), name='verify-payment'),
    path('transactions/', TransactionListView.as_view(), name='transactions'),
]
