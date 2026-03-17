from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/update/', views.update_cart),
    path('cart/remove/', views.remove_from_cart),
]