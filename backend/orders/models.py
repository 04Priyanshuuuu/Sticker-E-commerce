from django.conf import settings
from django.db import models
from stickers.models import Sticker

User = settings.AUTH_USER_MODEL

class Order(models.Model):
    STATUS = (
        ('created','Created'),
        ('paid','Paid'),
        ('shipped','Shipped'),
        ('cancelled','Cancelled'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS, default='created')
    created_at = models.DateTimeField(auto_now_add=True)
    shipping_address = models.TextField(blank=True, null=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    sticker = models.ForeignKey(Sticker, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=20, default='M')
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
