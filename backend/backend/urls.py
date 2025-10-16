from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter 
from products.views import ProductViewSet
from orders.views import OrderViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path ('api/auth/',include('accounts.urls')),
    path('', include('stickers.urls')),



    path("__reload__/",include("django_browser_reload.urls")),
]
