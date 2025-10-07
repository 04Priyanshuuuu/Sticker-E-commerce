from django.urls import path
from accounts.views import UserChangePasswordView, UserPasswordResetView, UserProfileView, UserRegistrationView, UserLoginView,ForgotPasswordView, UserLogoutView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("changepassword/", UserChangePasswordView.as_view(), name="changepassword"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/<uid>/<token>/", UserPasswordResetView.as_view(), name="reset-password"),
     path('logout/', UserLogoutView.as_view(), name='logout'),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),

] 
