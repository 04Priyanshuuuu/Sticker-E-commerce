from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Sticker, Cart, CartItem,Order, OrderItem
from .serializers import StickerSerializer, CartSerializer, OrderSerializer
from rest_framework import viewsets, status, filters

class StickerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sticker.objects.all().order_by('-created_at')
    serializer_class = StickerSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    sticker_id = request.data.get('sticker_id')
    size = request.data.get('size', 'M')
    qty = int(request.data.get('quantity', 1))
    cart, _ = Cart.objects.get_or_create(user=user)
    item, created = CartItem.objects.get_or_create(cart=cart, sticker_id=sticker_id, size=size)
    if not created:
        item.quantity += qty
    else:
        item.quantity = qty
    item.save()
    return Response({'status': 'ok'})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    quantity = request.data.get('quantity')

    try:
        item = cart.items.get(id=item_id)
        item.quantity = quantity
        item.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'detail': 'Item not found in cart'}, status=404)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart, _ = Cart.objects.get_or_create(user=user)
    if not cart.items.exists():
        return Response({'detail':'cart empty'}, status=status.HTTP_400_BAD_REQUEST)
    order = Order.objects.create(user=user, total=0)
    total = 0
    for item in cart.items.all():
        OrderItem.objects.create(order=order, sticker=item.sticker, quantity=item.quantity, size=item.size, price_at_purchase=item.sticker.price)
        total += item.quantity * float(item.sticker.price)
    order.total = total
    order.save()
    cart.items.all().delete()
    return Response(OrderSerializer(order).data)
