from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('searchResults', index),
    path('advanced-search', index),
]
