from django.urls import path
from . import views
from django.contrib.auth.views import LoginView

appname = 'app1'

urlpatterns = [
    path('',views.home, name='home'),
    path('contact/',views.contact, name='contact'),
    path('services/', views.service, name = 'services'),
    path('about/',views.about, name = 'about'),
    path('bedsitters/', views.bedsitters, name = 'bedsitters'),
    path('onebd/',views.onebd, name = 'onebd'),

    path('house_list/',views.house_list, name='house_list'),
    path('apartment/', views.apartment, name= 'apartment'),
    path('shop/', views.shop, name= 'shop'),

    path('logout/', views.logout, name = 'logout'),
    #login for admin
    path('a/login/', LoginView.as_view(template_name='admin_login.html'), name='admin_login'),
    path('house/<int:house_id>/delete/', views.delete_house, name='delete_house'),  # Delete a house
    path('thanks/', views.thank_you, name='thanks'),
    path('stkerror/', views.stk_error, name='stkerror'),
    path('about/stk_push/',views.stk_push, name= 'stk_push'),
    path('donate/', views.donate, name= 'donate'),



    


    


   

    
   
    

]