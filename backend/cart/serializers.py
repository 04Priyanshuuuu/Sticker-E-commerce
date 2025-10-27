from rest_framework import serializers
from stickers.models import Sticker
from stickers.serializers import StickerSerializer
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    sticker = StickerSerializer(read_only=True)
    sticker_id = serializers.PrimaryKeyRelatedField(
        queryset=Sticker.objects.all(), write_only=True, source='sticker'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'sticker', 'sticker_id', 'quantity', 'size']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']
