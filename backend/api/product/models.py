from django.db import models
from django.db.models.fields.related import ForeignKey
from api.category.models import Category
# Create your models here.

class Size(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE,null=True,blank=True, related_name='sizes')
    SIZES = (('L','Large'),('M','Medium'),('S','Small'),)
    size = models.CharField(max_length=5,default='S',choices=SIZES)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return (f'{self.product.name} ({self.size})')
    
class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=350)
    price = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True, blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

