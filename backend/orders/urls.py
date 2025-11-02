from django.urls import path
from .views import cancel_order, create_order, get_user_orders

urlpatterns = [
    path('', get_user_orders, name="get_user_orders"),
    path('create/', create_order, name="create_order"),
    path('<int:pk>/cancel/', cancel_order, name="cancel_order"),
]
