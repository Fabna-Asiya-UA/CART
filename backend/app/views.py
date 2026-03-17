from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    return Response(ProductSerializer(products, many=True).data)

@api_view(['GET'])
def get_cart(request):
    cart = CartItem.objects.all()
    return Response(CartItemSerializer(cart, many=True).data)

@api_view(['POST'])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart_item, created = CartItem.objects.get_or_create(product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return Response({"message": "Added to cart"})

@api_view(['POST'])
def update_cart(request):
    cart_id = request.data.get('cart_id')
    quantity = request.data.get('quantity')
    cart_item = CartItem.objects.get(id=cart_id)
    cart_item.quantity = quantity
    cart_item.save()
    return Response({"message": "Cart updated"})

@api_view(['POST'])
def remove_from_cart(request):
    cart_id = request.data.get('cart_id')
    CartItem.objects.get(id=cart_id).delete()
    return Response({"message": "Item removed"})