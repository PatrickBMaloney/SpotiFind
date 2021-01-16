from django.urls import path
from .views import main, RoomView

urlpatterns = [
    path('api/', RoomView.as_view()),
    path('', main)
]
