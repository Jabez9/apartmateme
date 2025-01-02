from django.urls import path
from . import views
from django.contrib.auth.views import LoginView


appname = 'users'


urlpatterns = [
    path('landlorddashboard/', views.landlorddashboard, name= 'landlorddashboard'),
    path('register/',views.register, name = 'register'),
    path('addhouse/',views.addhouse,name='addhouse'),
    path('login/',views.login,name='login' ),
]



