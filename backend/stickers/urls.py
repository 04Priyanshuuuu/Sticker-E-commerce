from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StickerViewSet

router = DefaultRouter()
router.register(r'', StickerViewSet, basename='sticker')

urlpatterns = [
    
    path('', include(router.urls)),
]
 



