from rest_framework import serializers
from stickers.serializers import StickerSerializer
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    sticker = StickerSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'sticker', 'quantity', 'size', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'status', 'created_at', 'shipping_address', 'items']
