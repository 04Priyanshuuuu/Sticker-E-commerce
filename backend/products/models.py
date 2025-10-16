from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='stickers/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.CharField(max_length=50)  # e.g. "Small", "Medium", "Large"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
