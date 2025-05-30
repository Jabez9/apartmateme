from django.urls import path
from . import views
from django.contrib.auth.views import LoginView

appname = 'app1'

urlpatterns = [
    path('api/bedsitters/', views.bedsitter_api, name = 'api_bedsitters'),
    path('api/onebd/', views.onebd_api, name = 'api_onebd'),
    path('api/twobd/', views.twobd_api, name = 'api_twobd'),
    path('api/apartment/', views.apartment_api, name= 'api_apartment'),
    path('api/shop/', views.shop_api, name= 'api_shop'),
    path('api/stk_push/', views.stk_push, name='stk_push'),
    path('api/mpesa/callback/', views.mpesa_callback, name='mpesa_callback'),
]

