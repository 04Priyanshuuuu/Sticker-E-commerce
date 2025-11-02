from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'colored_status', 'cancelled_by', 'total', 'created_at')
    list_filter = ('status', 'cancelled_by')

    def colored_status(self, obj):
        colors = {
            'pending': 'orange',
            'accepted': 'gray',
            'on_the_way': 'blue',
            'delivered': 'green',
            'cancelled': 'red'
        }
        color = colors.get(obj.status, 'black')
        return format_html(f'<b style="color:{color}">{obj.status.upper()}</b>')
    colored_status.short_description = "Status"

    # 👇 restrict admin from editing cancelled-by-user orders
    def get_readonly_fields(self, request, obj=None):
        if obj and obj.status == 'cancelled' and obj.cancelled_by == 'user':
            return [f.name for f in self.model._meta.fields]  # sabhi fields readonly ho jayengi
        return super().get_readonly_fields(request, obj)

    # 👇 agar admin cancel kare toh record me likh de cancelled_by = admin
    def save_model(self, request, obj, form, change):
        if obj.status == 'cancelled' and not obj.cancelled_by:
            obj.cancelled_by = 'admin'
        super().save_model(request, obj, form, change)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'sticker', 'quantity', 'size', 'price_at_purchase')
