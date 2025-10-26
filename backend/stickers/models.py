from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Sticker(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='stickers/')
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


    CATEGORY_CHOICES = [
    ('anime', 'Anime'),
    ('cricketers', 'Cricketers'),
    ('cars', 'Cars'),
    ('nature', 'Nature'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='anime')


    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    sticker = models.ForeignKey(Sticker, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=20, default='M')

    class Meta:
        unique_together = ('cart', 'sticker', 'size')
       

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
