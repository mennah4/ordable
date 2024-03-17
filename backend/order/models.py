import uuid
from django.db import models
from product.models import Product
from user.models import User
from store.models import Store, StoreProduct

ORDER_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('processing', 'Processing'),
    ('completed', 'Completed'),
    ('cancelled', 'Cancelled'),
]

PAYMENT_STATUS_CHOICES = [
    ('online', 'Online'),
    ('cash', 'Cash'),
]

ORDER_TYPE_CHOICES = [
    ('delivery', 'Delivery'),
    ('pickup', 'Pickup'),
]

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_no = models.CharField(max_length=10, unique=True, default="")
    customer = models.ForeignKey(User, on_delete=models.CASCADE)  # Customer role user
    order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField()
    delivery_address = models.CharField(max_length=100, null=True, default='')
    order_type = models.CharField(max_length=20, choices=ORDER_TYPE_CHOICES, default='delivery')
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='processing')
    payment_type = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='processing')
    products = models.ManyToManyField(Product)
