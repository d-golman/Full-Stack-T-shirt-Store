from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serialize import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from api.order.models import Order
import re
import random
# Create your views here.

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)]+[str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error':'Send a post request with valid parameters'})
    username = request.POST['email']
    password = request.POST['password']

# validation

    if not re.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", username):
        return JsonResponse({'error':'Email is invalid'})

    if len(password) < 3:
        return JsonResponse({'error':'Pasword needs to be at least 3 characters'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email=username).values().first()
            usr_dict.pop('password')
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error':'Invalid Password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid Email'})

def signout(request, token):
    logout(request)
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(session_token = token)
        user.session_token = '0'
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid user ID'})
    return JsonResponse({'success':'Logout success'})

def userCheck(request,token):
    UserModel = get_user_model()
    try:
        if(token and token != '0'):
            user = UserModel.objects.get(session_token = token)
            return JsonResponse({'result':True})
        else:
            return JsonResponse({'result':False})
    except:
        return JsonResponse({'result':False})

def getUserData(request,token):
    UserModel = get_user_model()
    try:
        if(token and token != '0'):
            user = UserModel.objects.get(session_token = token)
            userData = {key: user.__dict__[key] for key in user.__dict__.keys() and {'id','email','password','name','phone'}}
            ordersObjects = Order.objects.all().filter(user=user)
            orders = []
            for orderObject in ordersObjects:
                order = {key: orderObject.__dict__[key] for key in orderObject.__dict__ and ['total_amount','address','paid','link']}
                order['products'] = [field.__str__() for field in orderObject.products.all()]
                orders.append(order)
            userData['orders'] = orders
            return JsonResponse(userData)
        else:
            return JsonResponse({'result':False})
    except KeyError:
        print(KeyError)
        return JsonResponse({'result':False})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny],'update':[AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:            
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]