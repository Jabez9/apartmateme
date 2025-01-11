from app1.views import *
from django.shortcuts import render,redirect,get_object_or_404
from django.contrib import messages
from app1.models  import  Landlord, House
from django.utils.safestring import mark_safe
from app1.forms import HouseForm


#REGISTER FUNCTION
def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        repeat_pass = request.POST.get('repeat_pass')

        # Validate form fields
        if not all([name, email, password, repeat_pass]):
            messages.error(request, "All fields are required.")
            return render(request, 'register.html')

        # Check if passwords match
        if password.strip() != repeat_pass.strip():
            messages.error(request, "Passwords do not match.")
            return render(request, 'register.html')

        # Check if email is already registered
        if Landlord.objects.filter(email=email).exists():
            messages.error(request, "Email is already registered.")
            return render(request, 'register.html')

        # Save the new landlord
        landlord = Landlord(
            name=name,
            email=email,
            password=password,  # Consider hashing the password using Django's built-in User model for better security.
        )
        landlord.save()

        # clear session data after successful registration
        request.session.flush()

        # Success message and redirect to Login
        messages.success(request, f"Welcome, {name}! Thank you for registering ApartmateME !")
               # Redirect to a new page to handle the countdown
        return render(request, 'login.html')
    else:
        return render(request, 'register.html')



## LOGIN FUNCTION
def login(request):
    # Initialize error_message to handle GET requests
    error_message = None

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            # Attempt to retrieve the landlord based on credentials
            landlord = Landlord.objects.get(email=email, password=password)

            # Store landlord's ID in session to maintain login state
            request.session['landlord_id'] = landlord.id

            # Check if the landlord has a house
            house = House.objects.filter(landlord=landlord).first()

            if house:
                # If the landlord has a house, display the house details
                return render(request, 'landlorddashboard.html', {'house': house})
            else:
                # If no house, display the "Add House" button
                return render(request, 'landlorddashboard.html', {'add_house': True})

        except Landlord.DoesNotExist:
            # Use mark_safe to allow HTML in the message
            error_message = mark_safe(
                "Invalid credentials. Please try again.<br>"
                "For help contact <a href='tel:+254791751475'>0791751475</a>"
            )
            messages.error(request, error_message)

    # For GET requests or if there's no error, render the login page
    return render(request, 'login.html', {'email': email if 'email' in locals() else '', 'error_message': error_message})


## LOGGING OUT
def logout(request):
    # Clear the session to log out the user
    request.session.flush()
    
    # Add a success message
    messages.success(request, "You have successfully logged out.")
    
    # Redirect to the login page
    return redirect('login')


##DASHBOARD VIEW
def landlorddashboard(request):

    # Get the logged-in landlord
    landlord_id = request.session.get('landlord_id')
    if landlord_id:
        landlord = Landlord.objects.get(id=landlord_id)
        
        # Check if the landlord has a house
        house = House.objects.filter(landlord=landlord).first()
        
        if house:
            return render(request, 'landlorddashboard.html', {'house': house})
        else:
            return render(request, 'landlorddashboard.html', {'add_house': True})
    else:
        # Redirect to login page if not logged in
        return redirect('login')


## LANDLORD  EDITTING A HOUSE
def edit_house(request, house_id):
    house = get_object_or_404(House, id=house_id)

    if request.method == 'POST':
        house.name = request.POST.get('name')
        house.status = request.POST.get('status')

        # Handle the image update if a new image is uploaded
        if request.FILES.get('main_image'):
            house.main_image = request.FILES['main_image']

        house.save()

        messages.success(request, "House details updated successfully.")
        return redirect('landlorddashboard')  # Adjust to your redirect URL

    return render(request, 'edit_house.html', {'house': house})
