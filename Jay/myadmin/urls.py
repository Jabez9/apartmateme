from django.urls import path
from . import views 

appname = 'myadmin'

urlpatterns = [
    path('landlords/', views.landlords, name='landlords'), # URL for listing all landlords
    path('landords/edit/<int:landlord_id>/', views.edit_landlord, name= 'edit_landlord'), # URL for editing a landlord
    path('landlords/delete/<int:landlord_id>/', views.delete_landlord, name='delete_landlord'), # URL for deleting a landlord
    path('add_landlord/', views.add_landlord, name = 'add_landlord'), # URL for adding a new landlord
    path('house/<int:pk>/', views.house_details, name = 'house_details'), # URL for viewing house details
    path('edit-house/<int:house_id>/', views.edit_house, name='edit_house'),  # URL for editing house details
    path('landlord/<int:landlord_id>/houses/', views.view_landlord_houses, name='view_landlord_houses'), # URL for viewing houses owned by a landlord
    path('house/<int:house_id>/delete/', views.delete_house, name='delete_house'),  # Delete a house
    path('house_list/', views.house_list, name='house_list'),  # URL for listing all houses
    # path('admin_dashboard/', views.admin_dashboard, name='admin_dashboard'),
]