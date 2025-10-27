from django.contrib import admin
from .models import Sticker

@admin.register(Sticker)
class StickerAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'price', 'stock', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
