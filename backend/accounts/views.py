from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from accounts.serializers import UserLoginSerializer, UserLogoutSerializer, UserProfileSerializer, UserRegistrationSerializer, UserChangePasswordSerializer, ForgotPasswordSerializer, UserPasswordResetSerializer
from django.contrib.auth import authenticate
from accounts.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.utils import Util
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError



# Generate JWT tokens for a user manually 
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Signup k liye view
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)

        access = tokens.get('access')
        refresh = tokens.get('refresh')

        response = Response({"msg": "User registered successfully"}, status=status.HTTP_201_CREATED)
        response.set_cookie('access', access, httponly=True, samesite='Lax', secure=False, max_age=15 * 60)
        response.set_cookie('refresh', refresh, httponly=True, samesite='Lax', secure=False, max_age=7 * 24 * 60 * 60)
        return response


# SignIn/Login k liye view
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            tokens = get_tokens_for_user(user)
            access = tokens.get('access')
            refresh = tokens.get('refresh')

            response = Response({"msg": "User logged in successfully"}, status=status.HTTP_200_OK)
            # ✅ httpOnly cookies set kar rahe hain
            response.set_cookie(
                key='access',
                value=access,
                httponly=True,
                samesite='Lax',
                secure=False,  # in dev (use True in production with HTTPS)
                max_age=15 * 60
            )
            response.set_cookie(
                key='refresh',
                value=refresh,
                httponly=True,
                samesite='Lax',
                secure=False,
                max_age=7 * 24 * 60 * 60
            )
            return response
        else:
            return Response(
                {'errors': {'non_field_errors': ['Invalid email or password.']}},
                status=status.HTTP_404_NOT_FOUND
            )
   
    

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"msg": "Password updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ForgotPasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        link = f'http://localhost:3000/api/auth/reset-password/{uid}/{token}'

        # Send email here in view (not serializer)
        body = f'Click the link below to reset your password \n{link}'
        data = {
            'email_subject': 'Reset your password',
            'email_body': body,
            'to_email': user.email
        }
        Util.send_email(data)

        return Response(
            {"msg": "Password reset email sent. Please check your email."},
            status=status.HTTP_200_OK
        )
  
    

class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"token": "Token is not valid or expired."}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Update password here
            password = serializer.validated_data['password']
            user.set_password(password)
            user.save()

            return Response({"msg": "Password reset successfully"}, status=status.HTTP_200_OK)

        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            return Response({"token": "Token is not valid or expired."}, status=status.HTTP_400_BAD_REQUEST)
   
    

class UserLogoutView(APIView):
    def post(self, request):
        serializers = UserLogoutSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        response = Response({'msg': 'User logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response
    





