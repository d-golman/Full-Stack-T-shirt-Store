from django.db import models
from api.user.models import CustomUser
from api.product.models import Product
from api.product.models import Size
import uuid
# Create your models here.


class Order(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    products = models.ManyToManyField(Size, blank=True)
    total_product = models.CharField(max_length=500, default=0)
    transaction_id = models.CharField(max_length=150,default=0)
    total_amount = models.CharField(max_length=50, default=0)
    address = models.CharField(max_length=50, null=True, blank=True)
    link = models.CharField(max_length=120, null=True, blank=True)
    paid = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    

    def __str__(self) -> str:
        return f'{self.user.email} / {self.total_amount} / paid : {self.paid}'