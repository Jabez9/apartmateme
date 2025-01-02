from django.urls import path
from . import views 

appname = 'myadmin'

urlpatterns = [
    path('landlords/', views.landlords, name='landlords'),
    path('landords/edit/<int:landlord_id>/', views.edit_landlord, name= 'edit_landlord'),
    path('landlords/delete/<int:landlord_id>/', views.delete_landlord, name='delete_landlord'),
    path('add_landlord/', views.add_landlord, name = 'add_landlord'),
    path('house/<int:pk>/', views.house_details, name = 'house_details'),
   
    path('edit-house/<int:house_id>/', views.edit_house, name='edit_house'),  # URL for editing house details
    path('landlord/<int:landlord_id>/houses/', views.view_landlord_houses, name='view_landlord_houses'),
    # path('admin_dashboard/', views.admin_dashboard, name='admin_dashboard'),
]