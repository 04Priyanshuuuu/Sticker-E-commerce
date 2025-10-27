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


    


 


    


  
