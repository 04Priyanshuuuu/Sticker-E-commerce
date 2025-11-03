from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'colored_status', 'cancelled_by', 'total', 'created_at')
    list_filter = ('status', 'cancelled_by')
    # agar tum chaho to yahan readonly_fields default set na karo — hum dynamic return karenge

    def colored_status(self, obj):
        colors = {
            'pending': 'orange',
            'accepted': 'gray',
            'on_the_way': 'blue',
            'delivered': 'green',
            'cancelled': 'red',
        }
        color = colors.get(obj.status, 'black')
        return format_html(
             '<a href="{}" style="color:{}; font-weight:bold; text-decoration:none;">{}</a>',
            f'/admin/orders/order/{obj.id}/change/',
            color,
            obj.status.upper()
        )
        colored_status.short_description = "Status"
        colored_status.admin_order_field = "status"

    def get_readonly_fields(self, request, obj=None):
        """
        - Agar order user ne cancel kiya ho (cancelled_by == 'user'): poora form readonly.
        - Warna normal behavior (admin full edit kar sake).
        """
        if obj and obj.cancelled_by == 'user':
            # return all model fields as readonly so admin cannot change anything
            return [field.name for field in self.model._meta.fields]
        return super().get_readonly_fields(request, obj)

    def save_model(self, request, obj, form, change):
        # agar admin ne status ko "cancelled" set kiya aur cancelled_by blank hai
        # to cancelled_by ko admin set kar do
        if obj.status == 'cancelled' and not obj.cancelled_by:
            obj.cancelled_by = 'admin'
        super().save_model(request, obj, form, change)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'sticker', 'quantity', 'size', 'price_at_purchase')
