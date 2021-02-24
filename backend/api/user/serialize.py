from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.hashers import make_password
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    def validate(self, validated_data):        
        if len({**validated_data}['password']) < 5:
            raise serializers.ValidationError("Password minimum length is 5")
        return validated_data

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password != None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self,instance:CustomUser, validated_data):
        if {**validated_data}['session_token'] == instance.__dict__['session_token']:
            for attr, value in validated_data.items():
                if attr == 'session_token':
                    continue
                if attr == 'password':
                    instance.set_password(value)
                else:
                    setattr(instance,attr,value)
            instance.save()
        else:            
            raise serializers.ValidationError("Wrong token")
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password':{'write_only':True},'session_token':{'write_only':True}}
        fields = ('name','email','password','phone','session_token','is_active','is_staff','is_superuser')