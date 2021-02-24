from django.shortcuts import render
from rest_framework import viewsets
from .serialize import ProductSerializer
from .models import Product
from .models import Size
from django.http import JsonResponse
from django.forms.models import model_to_dict
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

def getSizes(request,id):
    product = Product.objects.get(id = id)
    sizes = Size.objects.filter(product=product).filter(stock__gt = 0)
    result = {'sizes':[]}
    for size in sizes:        
        result['sizes'].append(size.size)
    return JsonResponse(result)