from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register('', views.UserViewSet)

urlpatterns = [
    path('login/', views.signin, name='signin'),
    path('logout/<str:token>/', views.signout, name='signout'),
    path('usercheck/<str:token>/', views.userCheck, name='userCheck'),
    path('getuserdata/<str:token>/', views.getUserData, name='userCheck'),
    path('', include(router.urls)),
]