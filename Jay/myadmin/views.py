from django.shortcuts import render,redirect,get_object_or_404
from app1.models  import  Landlord
from django.http import HttpResponseForbidden
from app1.models import House
from .forms import LandlordEditForm
from .forms import LandlordForm
from django.contrib.auth.decorators import login_required
from app1.views import *


# LIST OF HOUSES
def house_list(request):
    houses = House.objects.all()  # This will retrieve all houses with their landlords
    return render(request, 'house_list.html', {'houses': houses})


# HOUSE DETAILS
def house_details(request,pk):
    house = get_object_or_404(House, pk=pk)

    #fetch images from s3
    image_url = get_s3_url(house.image.name)
    return render(request, 'house_details.html', {'house': house, 'image_url': image_url})



## SEEING LANDLORDS
def landlords(request):
    landlords = Landlord.objects.all()
    return render(request, 'landlords.html', {'landlords':landlords})


# EDITTING A LANDLORD
@login_required
def edit_landlord(request, landlord_id):
    # Get the landlord by their ID
    landlord = Landlord.objects.get(id=landlord_id)
    
    if request.method == 'POST':
        form = LandlordEditForm(request.POST, instance=landlord)
        if form.is_valid():
            # Save the updated information
            form.save()
            return redirect('landlords')  # Redirect to the list of landlords after saving
    else:
        form = LandlordEditForm(instance=landlord)
    
    return render(request, 'edit_landlord.html', {'form': form})

# DELETING A LANDLORD
def delete_landlord(request, landlord_id):
    landlord = get_object_or_404(Landlord, id=landlord_id)
    landlord.delete()
    return redirect('landlords')  # Redirect to the landlord list after deletion


# ADDING A LANDLORD
def add_landlord(request):
    if request.method == 'POST':
        form = LandlordForm(request.POST)
        if form.is_valid():
            form.save()  # Save the new landlord to the database
            return redirect('landlords')  # Redirect back to the landlords list page
    else:
        form = LandlordForm()

    return render(request, 'add_landlord.html', {'form': form})

##VIEWING LANDLORD HOUSE OWNED
def view_landlord_houses(request, landlord_id):
    # Get the landlord object based on the landlord_id
    landlord = get_object_or_404(Landlord, id=landlord_id)
    
    # Get all houses tied to this landlord
    houses = House.objects.filter(landlord=landlord)
    
    return render(request, 'view_landlord_houses.html', {'landlord': landlord, 'houses': houses})


#THE ADMIN DASHBOARD
@login_required
def admin_dashboard(request):
    if not request.user.is_superuser:
        return HttpResponseForbidden("You do not have access to this page.")
    # Admin-specific logic here
    return render(request, 'admin_dashboard.html')

# View to delete a house
def delete_house(request, house_id):
    house = get_object_or_404(House, id=house_id)  # Fetch house by id
    if request.method == "POST":
        house.delete()  # Delete the house
        return redirect('house_list')  # Redirect to house list after deletion
    return render(request, 'confirm_delete.html', {'house': house})  # Confirmation page
