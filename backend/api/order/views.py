from django.http.response import HttpResponse
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serialize import OrderSerializer
from .models import Order
from api.product.models import Product
from api.product.models import Size
from django.views.decorators.csrf import csrf_exempt
import json
import uuid
from yookassa import Configuration, Payment
# Create your views here.

Configuration.account_id = '719057'
Configuration.secret_key = 'test_ZeaaEeqWWZi4asPd1TNeJACFSgAyVqfJQHukOXniCTU'


def validate_user_session(token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(session_token=token)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def add(request,  token):
    if not validate_user_session(token):
        return JsonResponse({'error':'login failure', 'code':'500'})
    
    if request.method == "POST":
        data = (json.loads(request.body))
        print(data['products'])
        amount = data['amount']
        raw_products = data['products']
        products = []
        for product_name,size in raw_products:
            size = Size.objects.filter(product = Product.objects.get(name = product_name)).get(size = size)
            size.stock -= 1
            size.save()
            products.append(size)
        total_product = len(raw_products)
        address = data['address']
        id = uuid.uuid4()
        payment_data = create_link(amount, 'localhost/order/success/{0}/'.format(id), str(raw_products))
        link = payment_data['confirmation']['confirmation_url']
        transaction_id = payment_data['id']
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(session_token=token)
        except UserModel.DoesNotExist:
            return JsonResponse({'error':'User doesnt exist'})
        
        order = Order(id=id,user=user,total_product=total_product,total_amount=amount, address =address,link=link, transaction_id=transaction_id)
        order.save()
        order.products.set(products)
        return JsonResponse({'payment_url':link})

def create_link(amount,return_url,description):
    payment = Payment.create({
        "amount": {
            "value": amount,
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": return_url
        },
        "capture": True,
        "description": description
    }, uuid.uuid4())
    return json.loads(payment.json())

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny],'update':[AllowAny]}
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer
    
    def get_permissions(self):
        try:            
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
