from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializers import ProductSerializer

class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'size']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']
