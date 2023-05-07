

from django.urls import path
from .views import home,disclaimer,faq

urlpatterns = [
    path('', home, name='index'),
    path('disclaimer/', disclaimer, name='disclaimer'),
    path('',faq,name='faq')
]
