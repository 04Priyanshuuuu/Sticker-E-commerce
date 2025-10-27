from django.urls import path
from .views import get_cart, add_to_cart, update_cart_item

urlpatterns = [
    path('', get_cart, name="get_cart"),
    path('add/', add_to_cart, name="add_to_cart"),
    path('update/<int:item_id>/', update_cart_item, name="update_cart_item"),
]
