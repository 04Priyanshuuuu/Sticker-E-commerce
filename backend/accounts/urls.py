from django.urls import path
from accounts.views import (
    UserChangePasswordView, 
    UserPasswordResetView, 
    UserProfileView, 
    UserRegistrationView,
    UserLoginView,
    ForgotPasswordView, 
    UserLogoutView, 
    CookieTokenRefreshView,
)

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("changepassword/", UserChangePasswordView.as_view(), name="changepassword"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/<uid>/<token>/", UserPasswordResetView.as_view(), name="reset-password"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="cookie_token_refresh"), 
]
