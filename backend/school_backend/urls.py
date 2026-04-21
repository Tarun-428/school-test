"""
Main URL configuration for school_backend.
Routes to each app's URL file.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT auth endpoints
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App endpoints
    path('api/students/', include('students.urls')),
    path('api/faculty/', include('faculty.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/gallery/', include('gallery.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/contact/', include('enquiries.urls')),
]
