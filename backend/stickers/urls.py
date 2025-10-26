from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StickerViewSet, get_cart, add_to_cart,create_order

router = DefaultRouter()
router.register(r'stickers', StickerViewSet, basename='sticker')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/cart/', get_cart),
    path('api/cart/add/', add_to_cart),
    path('api/orders/create/', create_order),
]
