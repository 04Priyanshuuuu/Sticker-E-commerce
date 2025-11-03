from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import UserProfile
from .serializers import UserProfileSerializer
from orders.models import Order
from orders.serializers import OrderSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # ✅ custom endpoint to get full dashboard data
    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        profile = UserProfile.objects.get(user=request.user)
        orders = Order.objects.filter(user=request.user).order_by('-created_at')[:5]

        # reward points logic (example)
        total_orders = orders.count()
        reward_points = total_orders * 10

        data = {
            "name": request.user.first_name or request.user.username,
            "email": request.user.email,
            "joined_date": profile.created_at,
            "total_orders": total_orders,
            "reward_points": reward_points,
            "custom_uploads": 3,  # TODO: replace with real model count later
            "orders": OrderSerializer(orders, many=True).data,
        }
        return Response(data)
