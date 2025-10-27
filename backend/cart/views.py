from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartSerializer

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
    if not sticker_id:
        return Response({"error": "Sticker ID required"}, status=400)
    cart, _ = Cart.objects.get_or_create(user=user)
    item, created = CartItem.objects.get_or_create(cart=cart, sticker_id=sticker_id)
    if not created:
        item.quantity += 1
    item.save()
    serializer = CartSerializer(cart)
    return Response(serializer.data)

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
