from pathlib import Path
import os
import environ
from django.contrib.messages import constants as message_constants
from corsheaders.defaults import default_headers, default_methods
from datetime import timedelta
import dj_database_url



# Initialize the environ
env = environ.Env()
env.read_env()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY =env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if env('DJANGOAPPMODE') == 'Debug' else False
print(f'Application is running in debug mode: {DEBUG}')

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    '*'
]

FRONTEND_URL = env('FRONTEND_URL')  # Or your deployed frontend domain

CORS_ALLOWED_ORIGINS = [
    env('FRONTEND_URL'),  # Your Next.js dev server
]

# Optional: Allow credentials if needed (e.g., for auth)
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = list(default_headers) + [
    "authorization",
]

CORS_ALLOW_METHODS = list(default_methods) + [
    "POST",
]

SESSION_COOKIE_SAMESITE = None  # This allows the session cookie to be sent with cross-site requests

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # optionally add others, e.g. SessionAuthentication if you want
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=58),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'app1',
    'users',
    'myadmin',
    'crispy_forms',
    'widget_tweaks',
    'storages',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

# to see the error if email exists
MESSAGE_STORAGE = 'django.contrib.messages.storage.session.SessionStorage'

MESSAGE_TAGS = {
    message_constants.ERROR: 'danger',
}



ROOT_URLCONF = 'Jay.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'Jay.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

if env.bool('USEDEBUGDB'):
#FOR LOCAL DEVELOPMENT USING DBSQLITE3
    DATABASES = {
       'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST'),
            'PORT': env('DB_PORT',default='5432'),
            'OPTIONS': {
                'sslmode': 'require',  # Use SSL for secure connection
            }
    }
    }

# settings.py


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Nairobi'

USE_I18N = True

USE_TZ = True


# Handling Media files locally
# MEDIA_URL = 'media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

# STATIC_URL = 'static/'
# # Add this line to set the STATIC_ROOT directory
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]

#whitenoise for serving static files locally
#STATIC_FILE_STORAGE='whitenoise.storage.CompressedManifestStaticFilesStorage'



# AWS S3 Storage settings
MEDIA_URL= f'https://{env('AWS_STORAGE_BUCKET_NAME')}.s3.{env('AWS_S3_REGION_NAME')}amazonaws.com/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATIC_URL = f'https://{env("AWS_STORAGE_BUCKET_NAME")}.s3.{env("AWS_S3_REGION_NAME")}.amazonaws.com/'


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


#Handling emails 
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER =env('EMAIL_HOST_USER') 
EMAIL_HOST_PASSWORD =env('EMAIL_HOST_PASSWORD') 
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = env('EMAIL_HOST_USER')  # This will be the sender's email address


# AWS S3 Bucket Configurations
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')
AWS_QUERYSTRING_AUTH = True # This will make sure that the signature will be included in the URL
# Tell Django to use the S3 storage backend for static files.


#My custom user model
AUTH_USER_MODEL = 'app1.Landlord'

#authentication backends
AUTH_PASSWORD_BACKENDS = ['app1.backends.EmailBackend']