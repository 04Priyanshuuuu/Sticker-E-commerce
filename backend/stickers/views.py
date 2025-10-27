from rest_framework import viewsets
from rest_framework.permissions import  AllowAny
from .serializers import StickerSerializer
from .models import Sticker
from rest_framework import viewsets,filters

class StickerViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = []  
    permission_classes = [AllowAny]
    queryset = Sticker.objects.all().order_by('-created_at')
    serializer_class = StickerSerializer
    lookup_field = 'id'
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']

