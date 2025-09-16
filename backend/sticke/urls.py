
from django.urls import path
from . import views

# localhost:8000/sticke
# localhost:8000/sticke/order

urlpatterns = [
    path('',views.all_sticke,name='all_sticke'),
    # path('order/',views.order,name='order'),
]
