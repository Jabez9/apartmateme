from django.urls import path
from . import views
from app1 import views as app1_views
from .views import (
    CustomPasswordResetDoneView,
    CustomPasswordResetCompleteView,
)

appname = 'users'

urlpatterns = [
    path("api/auth/register/", views.api_register, name="api_register"),
    path('api/add-house/', app1_views.add_house_api, name='add_house_api'),
    path('api/house-choices/', app1_views.HouseChoiceAPIView.as_view(), name='house_choice_api'),
    path('api/login/', views.landlord_login_api, name='api_login'),
    path('logout/', views.logout, name='logout'),
    path('api/forgot_password/', views.forgot_password_api, name='api_forgot_password'),
    path('api/reset_password/<uidb64>/<token>/', views.reset_password_api, name='api_reset_password'),
    path("api/landlord/houses/", views.landlord_houses_api, name="fetch_landlord_houses"),
    path('api/landlord/houses/<int:pk>/', views.LandlordHouseDetailView.as_view(), name='landlord_house_detail'),
    path('password-reset/done/', CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/done/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
]


