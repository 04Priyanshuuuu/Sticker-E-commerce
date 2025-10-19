from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from products.views import ProductViewSet
from orders.views import OrderViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    # If your stickers app defines its own `api/` prefix inside stickers/urls.py that's fine.
    # Otherwise consider exposing the router-based APIs under /api/ as well.
    path('', include('stickers.urls')),
    path("__reload__/", include("django_browser_reload.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
