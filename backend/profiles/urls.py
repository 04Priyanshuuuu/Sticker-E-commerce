from django.urls import path
from .views import UserProfileViewSet

user_profile = UserProfileViewSet.as_view({'get': 'list'})  # ya 'retrieve'

urlpatterns = [
    path('', user_profile, name='profile'),
]
