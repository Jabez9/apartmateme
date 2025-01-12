from django.shortcuts import render,redirect,get_object_or_404
from .forms import ContactForm,HouseForm
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from app1.models  import  Landlord
from django.http import JsonResponse
from .models import House,HouseImage, Landlord
import requests
from django.core.files import File
from .utils import *
from .credentials import MpesaAccessToken, MpesaPassword
#have to go through to get the meaning of this
import boto3
from Jay import settings



# Initializin a boto client
s3_client = boto3.client('s3', 
                         region_name=settings.AWS_S3_REGION_NAME, 
                         aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

def get_s3_url(filename):
    bucket_name = 'apartmateme'
    return f'https://{bucket_name}.s3.amazonaws.com/{filename}'


# Create your views here.
def home(req):
    return render(req, 'main/index.html')

def service(request):
    return render(request, 'main/services.html')

def about(request):
    return render(request, 'main/about.html')

def shop(request):
    # Filter houses where the type contains 'shop'
    shop_houses = House.objects.filter(type__icontains='shop')
    return render(request, 'main/shop.html', {'houses': shop_houses})

def apartment(request):
    # Filter houses where the type contains 'apartment'
    apartment_houses = House.objects.filter(type__icontains='apartment')
    return render(request, 'main/apartment.html', {'houses': apartment_houses})

def bedsitters(request):
    # Filter houses where the type contains 'bedsitter'
    bedsitter_houses = House.objects.filter(type__icontains='bedsitter')
    return render(request, 'main/bedsitters.html', {'houses': bedsitter_houses})

def onebd(request):
    # Filter houses where the type contains 'one bedroom'
    onebd_houses = House.objects.filter(type__icontains='one bedroom')
    return render(request, 'main/onebd.html', {'houses': onebd_houses})



def contact(request):
    # if request.method == 'POST':
    #     form = ContactForm(request.POST)
    #     if form.is_valid():
    #         # Get cleaned data
    #         name = form.cleaned_data['name']
    #         email = form.cleaned_data['email']
    #         subject = form.cleaned_data['subject']
    #         message = form.cleaned_data['message']

    #         # Construct the email
    #         full_subject = f"ApartmateMe Contact Form Submission: {subject}"
    #         full_message = f"""
    #         New contact form submission:

    #         Name: {name}
    #         Email: {email}
    #         Subject: {subject}
    #         Message: {message}
    #         """

    #         try:
    #             # Send the email
    #             send_mail(
    #                 subject=full_subject,
    #                 message=full_message,
    #                 from_email=settings.EMAIL_HOST_USER,
    #                 recipient_list=['apartmateme@gmail.com'], 
    #                 fail_silently=True,
    #             )
    #             # If the request is AJAX, return a JSON response
    #             if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #                 return JsonResponse({'success': True, 'message': "Your message has been sent successfully!"})
    #             # Otherwise, redirect
    #             messages.success(request, "Your message has been sent successfully!")
    #             return redirect('contact')

    #         except Exception as e:
    #             error_message = f"Failed to send email: {e}"
    #             if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #                 return JsonResponse({'success': False, 'message': error_message})
    #             messages.error(request, error_message)
    #     else:
    #         error_message = "Please correct the errors in the form."
    #         if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #             return JsonResponse({'success': False, 'message': error_message})
    #         messages.error(request, error_message)
    # else:
    #     form = ContactForm()

    # return render(request, 'main/contact.html', {'form': form})
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        form = ContactForm(request.POST)
        
        if form.is_valid():
            # Get cleaned data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']

            # Construct the email
            full_subject = f"ApartmateMe Contact Form Submission: {subject}"
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
                # Return success response
                return JsonResponse({'success': True, 'message': "Your message has been sent successfully!"})

            except Exception as e:
                # Handle any errors
                return JsonResponse({
                    'success': False,
                    'message': f"Failed to send email: {str(e)}"
                })
        
        else:
            # If the form is not valid
            error_message = "Please correct the errors in the form."
            return JsonResponse({'success': False, 'message': error_message})

    else:
        # If the request method is not POST or not AJAX
        form = ContactForm()
        return render(request, 'main/contact.html', {'form': form})



#ADDING A HOUSE TO THE DATABASE
def addhouse(request):

    landlord_id = request.session.get('landlord_id')
    if not landlord_id:
        messages.error(request, "You must log in to access this page.")
        return redirect('login')

    landlord = get_object_or_404(Landlord, id=landlord_id)

    if request.method == 'POST':
        house_form = HouseForm(request.POST, request.FILES, landlord=landlord)
        additional_images = request.FILES.getlist('additional_images')

        if house_form.is_valid():
            # Save the house instance
            house = house_form.save(commit=False)
            house.landlord = landlord
            house.save()

            # Save additional images
            add_images_to_house(house.id, additional_images)

            messages.success(request, "House added successfully!")
            return redirect('house_list')
        else:
            messages.error(request, "There was an error with your submission. Please try again.")

    else:
        house_form = HouseForm(landlord=landlord)

    return render(request, 'addhouse.html', {'house_form': house_form})


def fetch_houses(request):
    houses = House.objects.all()  # Fetch all houses
    house_list = [
        {
            "name": house.name,
            "location": house.location,
            "type":house.type,
            "status":house.status,
            "rent":house.rent,
            "agent_name":house.agent_name,
            "agent_phone":house.agent_phone,
            "pros":house.pros,
            "main_image": house.main_image.url,
            "images": [image.image.url for image in house.images.all()],

        }
        for house in houses
    ]
    return JsonResponse(house_list, safe=False)

# LANDLORD  EDITTING A HOUSE
def edit_house(request, house_id):
    house = get_object_or_404(House, pk=house_id)

    if request.method == "POST":
        # Fetch updated values from the form
        updated_name = request.POST.get('name')
        updated_status = request.POST.get('status')
        updated_rent = request.POST.get('rent')
        updated_pros = request.POST.get('pros')
        updated_description = request.POST.get('description')
        updated_main_image = request.FILES.get('main_image')

        # Update only fields that have been changed
        if updated_name and updated_name != house.name:
            house.name = updated_name

        if updated_status and updated_status != house.status:
            house.status = updated_status

        if updated_rent and updated_rent != house.rent:
            house.rent = updated_rent

        if updated_pros and updated_pros != house.pros:
            house.pros = updated_pros

        if updated_description and updated_description != house.description:
            house.description = updated_description

        if updated_main_image:
            house.main_image = updated_main_image

        # Save the updated house instance
        house.save()
        return redirect('landlorddashboard')  # Adjust redirection as needed

    return render(request, 'edit_house.html', {'house': house})


#THE ABOUT US DONATION
def stk_push(request):
    if request.method == "POST":
        phone = request.POST.get('phone_number')
        amount = request.POST.get('amount')

        access_token = MpesaAccessToken.validated_token

        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

        headers = {"Authorization": "Bearer %s" % access_token}

        payload = {   
            "BusinessShortCode": MpesaPassword.shortcode,    
            "Password": MpesaPassword.decoded_password,    
            "Timestamp":MpesaPassword.timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA":phone,    
            "PartyB":MpesaPassword.shortcode,    
            "PhoneNumber":phone,    
            "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",   
            "AccountReference":"ApartmateMe", 
            "TransactionDesc":"ApartmateMe"
                }
        # response = requests.post(api_url,json=payload,headers=headers)
        try:
            response = requests.post(api_url, json=payload, headers=headers)
            if response.status_code == 200:
                print("STK Push initiated successfully:", response.json())
                return redirect("thanks")
            else:
                print("Failed to initiate STK Push:", response.status_code, response.text)
                return redirect("error")
        except Exception as e:
            print("An error occurred:", str(e))
            return redirect("error")

    return redirect("thanks")
   #here i should have a fxn that after payment, redirect etc

def thank_you(request):
    return render(request, 'stk/thanks.html')

def stk_error(request):
    return render(request, 'stk/stkerror.html' )

def donate(request):
    return render(request, 'stk/donate.html')

