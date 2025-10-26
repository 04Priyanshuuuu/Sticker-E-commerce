from rest_framework import serializers
from .models import Sticker, Cart, CartItem,  Order, OrderItem

class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    sticker = StickerSerializer(read_only=True)
    sticker_id = serializers.PrimaryKeyRelatedField(queryset=Sticker.objects.all(), write_only=True, source='sticker')
    class Meta:
        model = CartItem
        fields = ['id','sticker','sticker_id','quantity','size']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    class Meta:
        model = Cart
        fields = ['id','user','items','created_at']



class OrderItemSerializer(serializers.ModelSerializer):
    sticker = StickerSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id','sticker','quantity','size','price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id','user','total','status','created_at','shipping_address','items']
