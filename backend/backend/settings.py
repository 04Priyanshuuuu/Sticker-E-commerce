"""
Django settings for backend project.
Production-ready
"""

import os
from pathlib import Path
import dj_database_url

# ===============================
# BASE
# ===============================

BASE_DIR = Path(__file__).resolve().parent.parent

# ===============================
# SECURITY
# ===============================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "unsafe-secret-key-change-me"
)

DEBUG = False

ALLOWED_HOSTS = ["*"]

# ===============================
# DATABASE
# ===============================

DATABASES = {
    "default":
    dj_database_url.config(
        default=
        f"sqlite:///{BASE_DIR / 'db.sqlite3'}"
    )
}

# ===============================
# APPLICATIONS
# ===============================

INSTALLED_APPS = [

    "django.contrib.admin",

    "django.contrib.auth",

    "django.contrib.contenttypes",

    "django.contrib.sessions",

    "django.contrib.messages",

    "django.contrib.staticfiles",

    # third party

    "rest_framework",

    "corsheaders",

    "cloudinary",

    "cloudinary_storage",

    # local apps

    "accounts",

    "stickers",

    "products",

    "cart",

    "orders",

    "profiles.apps.ProfilesConfig",
]

# ===============================
# MIDDLEWARE
# ===============================

MIDDLEWARE = [

    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",

    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ===============================
# URLS / WSGI
# ===============================

ROOT_URLCONF = "backend.urls"

WSGI_APPLICATION = "backend.wsgi.application"

# ===============================
# TEMPLATES
# ===============================

TEMPLATES = [
    {
        "BACKEND":
        "django.template.backends.django.DjangoTemplates",

        "DIRS": [
            BASE_DIR / "templates"
        ],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ===============================
# AUTH
# ===============================

AUTH_USER_MODEL = "accounts.User"

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

# ===============================
# CORS
# ===============================

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "https://sticke.vercel.app",
    "https://www.sticke.vercel.app"
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "https://sticke.vercel.app",
    "https://www.sticke.vercel.app"
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]


SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SAMESITE = "None"

CSRF_COOKIE_SAMESITE = "None"

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https"
)


# ===============================
# REST FRAMEWORK
# ===============================

REST_FRAMEWORK = {

    "DEFAULT_AUTHENTICATION_CLASSES": (

        "accounts.authentication.CookieJWTAuthentication",

        "rest_framework.authentication.BasicAuthentication",
    ),

    "DEFAULT_PERMISSION_CLASSES": (

        "rest_framework.permissions.IsAuthenticated",
    ),
}

# ===============================
# JWT
# ===============================

from datetime import timedelta

SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME":
    timedelta(minutes=15),

    "REFRESH_TOKEN_LIFETIME":
    timedelta(days=14),

    "AUTH_COOKIE":
    "access",

    "AUTH_COOKIE_REFRESH":
    "refresh",

    "AUTH_COOKIE_SECURE":
    True,

    "AUTH_COOKIE_HTTP_ONLY":
    True,

    "AUTH_COOKIE_PATH":
    "/",

    "AUTH_COOKIE_SAMESITE":
    "None",
}

# ===============================
# CLOUDINARY
# ===============================

DEFAULT_FILE_STORAGE = (
    "cloudinary_storage.storage.MediaCloudinaryStorage"
)

CLOUDINARY_STORAGE = {

    "CLOUD_NAME":
    os.getenv(
        "CLOUDINARY_CLOUD_NAME"
    ),

    "API_KEY":
    os.getenv(
        "CLOUDINARY_API_KEY"
    ),

    "API_SECRET":
    os.getenv(
        "CLOUDINARY_API_SECRET"
    ),
}

import cloudinary

cloudinary.config(

    cloud_name=os.getenv(
        "CLOUDINARY_CLOUD_NAME"
    ),

    api_key=os.getenv(
        "CLOUDINARY_API_KEY"
    ),

    api_secret=os.getenv(
        "CLOUDINARY_API_SECRET"
    ),
)

# ===============================
# STATIC FILES
# ===============================

STATIC_URL = "/static/"

STATIC_ROOT = (
    BASE_DIR / "staticfiles"
)

# ===============================
# EMAIL
# ===============================

EMAIL_BACKEND = (
    "django.core.mail.backends.smtp.EmailBackend"
)

EMAIL_HOST = "smtp.gmail.com"

EMAIL_PORT = 587

EMAIL_USE_TLS = True

EMAIL_HOST_USER = os.getenv(
    "EMAIL_HOST_USER"
)

EMAIL_HOST_PASSWORD = os.getenv(
    "EMAIL_HOST_PASSWORD"
)

PASSWORD_RESET_TIMEOUT = 900

# ===============================
# I18N
# ===============================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# ===============================
# DEFAULT PK
# ===============================

DEFAULT_AUTO_FIELD = (
    "django.db.models.BigAutoField"
)