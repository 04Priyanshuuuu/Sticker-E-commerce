from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from accounts.serializers import UserLoginSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user =  serializer.save()
            return Response({"msg": "User registered successfully"}, status=status.HTTP_201_CREATED)
            status=status.HTTP_201_CREATED
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True): 
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                return Response({"msg": "User logged in successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors': ['Invalid email or password.']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    