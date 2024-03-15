from order.models import Order
from user.models import User
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
 
