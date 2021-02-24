from django.db.models import fields
from rest_framework import serializers
from rest_framework.fields import SkipField
from .models import Product
from .models import Size

class SizeSerializer(serializers.SlugRelatedField):  
    def to_representation(self, obj):
        if obj.stock > 0:
            return(obj.size)


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required =False)
    sizes = SizeSerializer(many=True, read_only=True,slug_field='size',allow_null=False)
    class Meta:
        model = Product
        fields = ('id','name','description','sizes','price','is_active','image','category')