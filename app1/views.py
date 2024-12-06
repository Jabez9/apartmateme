from django.shortcuts import render,redirect,get_object_or_404
from .forms import ContactForm
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from app1.models  import  Landlord
from django.http import JsonResponse
from django.utils.timezone import now
from django.utils.safestring import mark_safe
from .models import House,HouseImage, Landlord
from .forms import HouseForm,HouseImageForm
from .forms import LandlordEditForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .forms import LandlordForm


from django.contrib.auth.decorators import user_passes_test



# Create your views here.
def home(req):
    return render(req, 'index.html')

def service(request):
    return render(request, 'services.html')

def about(request):
    return render(request, 'about.html')

def shop(request):
    return render(request,'shop.html')

def apartment(request):
    return render(request, 'apartment.html')


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Get cleaned data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']

            # Construct the email
            full_subject = f"Contact Form Submission: {subject}"
            full_message = f"""
            New contact form submission:

            Name: {name}
            Email: {email}
            Subject: {subject}
            Message: {message}
            """

            try:
                # Send the email
                send_mail(
                    subject=full_subject,
                    message=full_message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=['apartmateme@gmail.com'], 
                    fail_silently=True,
                )
                # If the request is AJAX, return a JSON response
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'success': True, 'message': "Your message has been sent successfully!"})
                # Otherwise, redirect
                messages.success(request, "Your message has been sent successfully!")
                return redirect('contact')

            except Exception as e:
                error_message = f"Failed to send email: {e}"
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'success': False, 'message': error_message})
                messages.error(request, error_message)
        else:
            error_message = "Please correct the errors in the form."
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'message': error_message})
            messages.error(request, error_message)
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})

#bedsitter 


def bedsitters(request):

    return render(request, 'bedsitters.html')



def onebd(request):
    return render(request, 'onebd.html')

    
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
        if password != repeat_pass:
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
        return render(request, 'redirect_to_login.html')
    else:
        return render(request, 'register.html')
    #     return redirect('/login/')
    # else:
    #     return render(request, 'register.html')

    # start of login


# ## LOGIN FUNCTION
 

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



# LIST OF HOUSES
def house_list(request):
    houses = House.objects.all()  # This will retrieve all houses with their landlords
    return render(request, 'house_list.html', {'houses': houses})


# HOUSE DETAILS
def house_details(request,pk):
    
    house = get_object_or_404(House, pk=pk)
    return render(request, 'house_details.html', {'house': house})

#ADDING A HOUSE 

def addhouse(request):
    # Check if the landlord is logged in
    landlord_id = request.session.get('landlord_id')
    if not landlord_id:
        messages.error(request, "You must log in to access this page.")
        return redirect('login')

    landlord = get_object_or_404(Landlord, id=landlord_id)

    if request.method == 'POST':
        house_form = HouseForm(request.POST, landlord=landlord)
        # We don't directly use HouseImageForm for handling multiple files
        images = request.FILES.getlist('images')  # Match 'images' from the template

        if house_form.is_valid():
            # Save the house instance
            house = house_form.save(commit=False)
            house.landlord = landlord
            house.save()

            # Validate and save images
            if len(images) > 5:
                messages.error(request, "You can only upload up to 5 images.")
                house.delete()  # Rollback if too many images
                return redirect('addhouse')

            for image in images:
                # Create a new HouseImage for each uploaded file
                HouseImage.objects.create(house=house, image=image)

            messages.success(request, "House added successfully!")
            # return redirect('house_list')  # Redirect to house list after adding
            return redirect('edit_house.html')

        else:
            messages.error(request, "There was an error with your submission. Please try again.")

    else:
        house_form = HouseForm(landlord=landlord)

    return render(request, 'addhouse.html', {
        'house_form': house_form,
    })





def fetch_houses(request):
    houses = House.objects.all()  # Fetch all houses
    house_list = [
        {
            "name": house.name,
            "location": house.location,
            "type":house.type
        }
        for house in houses
    ]
    return JsonResponse(house_list, safe=False)


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



## LANDLORD  EDITTING A HOUSE
def edit_house(request, house_id):
    house = House.objects.get(id=house_id)

    if request.method == 'POST':
        house.name = request.POST.get('name')
        house.status = request.POST.get('status')
        house.save()

        messages.success(request, "House details updated successfully.")
        return redirect('landlorddashboard')  # Redirect to the dashboard to see the updated house

    return render(request, 'edit_house.html', {'house': house})


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

# def landlorddashboard(request):
#     landlord_id = request.session.get('landlord_id')
#     if landlord_id:
#         try:
#             landlord = Landlord.objects.get(id=landlord_id)
#             # Get all houses for the landlord
#             houses = House.objects.filter(landlord=landlord)
#             return render(request, 'landlorddashboard.html', {'houses': houses, 'landlord': landlord})
#         except Landlord.DoesNotExist:
#             return redirect('login')
#     return redirect('login')
    
##VIEWING LANDLORD HOUSE OWNED
def view_landlord_houses(request, landlord_id):
    # Get the landlord object based on the landlord_id
    landlord = get_object_or_404(Landlord, id=landlord_id)
    
    # Get all houses tied to this landlord
    houses = House.objects.filter(landlord=landlord)
    
    return render(request, 'view_landlord_houses.html', {'landlord': landlord, 'houses': houses})



## CUSTOM ADMIN
# Restrict access to staff/admin users
@user_passes_test(lambda u: u.is_staff)
def admin_dashboard(request):
    houses = House.objects.all()
    landlords = Landlord.objects.all()
    return render(request, 'admin_dashboard.html', {'houses': houses, 'landlords': landlords})