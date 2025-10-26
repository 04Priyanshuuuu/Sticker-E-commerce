from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StickerViewSet, get_cart, add_to_cart,create_order, update_cart_item

router = DefaultRouter()
router.register(r'stickers', StickerViewSet, basename='sticker')

urlpatterns = [
    path('', include(router.urls)),
    path('cart/', get_cart,name="get_cart"),
    path('cart/add/', add_to_cart,name="add_to_cart"),
    path('cart/update/<int:item_id>/', update_cart_item, name="update_cart_item"),
    path('orders/create/', create_order,name="create_order"),
]
