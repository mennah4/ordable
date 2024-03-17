from ast import Store
from django.shortcuts import get_object_or_404, render
from .serializers import CartReadSerializer, CartSerializer, CartItemSerializer
from user.models import User
from cart.models import Cart, CartItem
from product.models import Product
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class CreateCart(APIView):

     def post(self, request):
        serializer = CartSerializer(data=request.data)

        if serializer.is_valid():
            cart = serializer.save()
            response_data = {
                'id': cart.id,
                'cart': serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class GetCart(APIView):
    def get(self, request):
        customer_id = request.GET.get('customer_id')

        try:
            cart = Cart.objects.get(customer_id=customer_id)
            serializer = CartReadSerializer(cart)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    
class AddCartItem(APIView):
    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        
        
        product_id=request.data.get('product')
        cart_id=request.data.get('cart')
        # Check if item already exists in cart
        existing_item = CartItem.objects.filter(product=product_id).first()
        if existing_item:
            # Update the quantity
            existing_item.quantity += 1
            existing_item.save()
        else:
            # Create a new CartItem
            product = Product.objects.get(pk=product_id)
            cart = Cart.objects.get(pk=cart_id)
            CartItem.objects.create(cart=cart, product=product, quantity=1)

        return Response("Item addedd successfuly", status=204)
    
class RemoveCartItem(APIView):
    def delete(self, request, pk):
        cart_item = CartItem.objects.get(pk=pk)
        cart_item.delete()
        return Response(status=204)

class UpdateCartItem(APIView):
    def put(self, request, pk):
        user = request.user
        cart_item = CartItem.objects.get(pk=pk)
        serializer = CartItemSerializer(cart_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

       