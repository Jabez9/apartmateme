from myadmin.views import admin_dashboard
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('inziwonyene/', admin.site.urls),
    path('', include('app1.urls')),
    path('',include('users.urls')),
    path('',include('myadmin.urls')),
    # for tokens and authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
