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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    payment_method = request.data.get('payment_method', 'cod')  # default COD
    shipping_address = request.data.get('shipping_address', '')

    cart, _ = Cart.objects.get_or_create(user=user)
    if not cart.items.exists():
        return Response({'detail':'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(user=user, total=0, payment_method=payment_method, shipping_address=shipping_address)
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


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Order

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_order(request, pk):
    try:
        order = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    # ✅ Check if user is admin or normal user
    if user.is_staff:  # Admin hai
        order.status = "Cancelled by Admin"
        order.can_update = True  # Admin ke cancel hone ke baad bhi editable
    else:  # Normal user hai
        # Agar order already cancel hai ya complete hai toh dobara cancel na ho
        if order.status in ["Cancelled by User", "Completed", "Cancelled by Admin"]:
            return Response({'error': 'Order cannot be cancelled again'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = "Cancelled by User"
        order.can_update = False  # user cancel kare toh lock

    order.save()
    return Response({'message': f'Order {order.status} successfully'})
