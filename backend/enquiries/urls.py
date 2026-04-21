from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnquiryViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'enquiries', EnquiryViewSet, basename='enquiry')
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [path('', include(router.urls))]
