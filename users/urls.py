from django.urls import path
from django.conf.urls import include, url
from users.views import dashboard,login_register,confirm_email


urlpatterns = [
    url(r"^accounts/", include("django.contrib.auth.urls")),
    url(r"^dashboard/", dashboard, name="dashboard"),
    path('password-reset/', include('password_reset.urls')),
    path('login_register/', login_register, name='login_register'),
    path('confirm-email/<str:uidb64>/<str:token>/', confirm_email, name='confirm_email'),
]




