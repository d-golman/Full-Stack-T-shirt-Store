from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    class Meta:
        model = Order
        fields = ('id','user','products','total_product','transaction_id','total_amount','address', 'paid','link')
