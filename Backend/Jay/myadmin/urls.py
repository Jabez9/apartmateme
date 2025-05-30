from django.urls import path
from . import views 

appname = 'myadmin'

urlpatterns = [
    path('api/landlords/', views.landlord_list_api, name='landlords'), # URL for listing all landlords
    path('landlords/edit/<int:landlord_id>/', views.edit_landlord_api, name= 'edit_landlord'), # URL for editing a landlord
    path('api/landlords/delete/<int:landlord_id>/', views.delete_landlord_api, name='delete_landlord'), # URL for deleting a landlord
    path('add_landlord/', views.add_landlord, name = 'add_landlord'), # URL for adding a new landlord
    path('api/house/<int:house_id>/', views.house_details_api, name = 'house_details'), # URL for viewing house details
    path('api/landlord/<int:landlord_id>/houses/', views.view_landlord_houses_api, name='view_landlord_houses'), # URL for viewing houses owned by a landlord
    path('api/deletehouse/<int:house_id>/', views.delete_house_api, name='delete_house_api'),  # Delete a house
    path('api/house_list/', views.house_list_api,name='house_list'),  # URL for listing all houses
    path('admin-login/', views.admin_login_api, name='admin_login_api'),
    path('admin_dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('api/landlords/<int:landlord_id>/', views.view_landlord_houses_api, name='landlord_detail'),
    path('api/landlords/<int:landlord_id>/houses/', views.view_landlord_houses_api, name='view_landlord_houses'),
]