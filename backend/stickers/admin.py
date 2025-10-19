from django.contrib import admin
from .models import Sticker, Cart, CartItem, Wishlist, Order, OrderItem

@admin.register(Sticker)
class StickerAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'price', 'stock', 'created_at')
    prepopulated_fields = {"slug": ("title",)}  # automatically slug banega title se

# Optional: register other models if needed
admin.site.register([Cart, CartItem, Wishlist, Order, OrderItem])
