from django.urls import path
from . import views

app_name = 'carts'

urlpatterns = [
    path('create/', views.CreateCart.as_view(), name='create_cart'),
    path('get/', views.GetCart.as_view(), name='customer_orders_list'),
    path('add/', views.AddCartItem.as_view(), name='add_cart_item'),
    path('update/<int:pk>', views.UpdateCartItem.as_view(), name='update_cart_item'),
    path('delete/<str:pk>/', views.RemoveCartItem.as_view(), name='delete_cart_item'),
]