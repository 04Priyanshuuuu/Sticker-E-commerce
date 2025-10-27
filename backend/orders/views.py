from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Order, OrderItem
from cart.models import Cart
from .serializers import OrderSerializer



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart, _ = Cart.objects.get_or_create(user=user)
    if not cart.items.exists():
        return Response({'detail':'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(user=user, total=0)
    total = 0

    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            sticker=item.sticker,
            quantity=item.quantity,
            size=item.size,
            price_at_purchase=item.sticker.price
        )
        total += item.quantity * float(item.sticker.price)

    order.total = total
    order.save()

    cart.items.all().delete()

    return Response(OrderSerializer(order).data)
