from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from products.views import ProductViewSet
from orders.views import OrderViewSet
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/stickers/', include('stickers.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),


    path("__reload__/", include("django_browser_reload.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
