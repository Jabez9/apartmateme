from django.shortcuts import render
from .forms import HouseForm
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from .models import House
import requests
import json
from .utils import *
from .credentials import MpesaAccessToken, MpesaPassword
import boto3
from Jay import settings
from .serializers import HouseSerializer, HouseChoiceSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status



# Initializin a boto client
s3_client = boto3.client('s3', 
                         region_name=settings.AWS_S3_REGION_NAME, 
                         aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

def get_s3_url(filename):
    bucket_name = 'apartmateme'
    return f'https://{bucket_name}.s3.amazonaws.com/{filename}'

@api_view(['GET'])
@permission_classes([AllowAny])  # 🔓 Makes the endpoint public
def shop_api(request):
    shops = House.objects.filter(type__icontains='shop')
    serializer = HouseSerializer(shops, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])  # 🔓 Makes the endpoint public
def apartment_api(request):
    apartments = House.objects.filter(type__icontains='apartment')
    serializer = HouseSerializer(apartments, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])  # 🔓 Makes the endpoint public
def bedsitter_api(request):
    bedsitters = House.objects.filter(type__icontains='bedsitter')
    serializer = HouseSerializer(bedsitters, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])  # 🔓 Makes the endpoint public
def onebd_api(request):
    one_bedrooms = House.objects.filter(type__icontains='one bedroom')
    serializer = HouseSerializer(one_bedrooms, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])  # 🔓 Makes the endpoint public
def twobd_api(request):
    two_bedrooms = House.objects.filter(type__icontains='two bedroom')
    serializer = HouseSerializer(two_bedrooms, many=True, context={'request': request})
    return Response(serializer.data)


@csrf_exempt
def contact(request):
    if request.method == "POST":
        try:
            # Load JSON safely
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
            
            name = data.get("name", "")
            email = data.get("email", "")
            subject = data.get("subject", "")
            message = data.get("message", "")

            # Basic validation (optional)
            if not (name and email and subject and message):
                return JsonResponse({"status": "error", "message": "All fields are required"}, status=400)

            email_subject = "ApartmateMe Contact Form submission"
            email_message = f"Name: {name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}"

            send_mail(
                email_subject,
                email_message,
                'apartmateme@gmail.com',   # From email
                ['apartmateme@gmail.com'], # To email(s)
                fail_silently=False,
            )

            return JsonResponse({"status": "success", "message": "Your message has been sent successfully!"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)

#ADDING A HOUSE TO THE DATABASE
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt  # Optional: better to handle CSRF properly in production
def add_house_api(request):
    landlord = request.user  # your custom user model instance

    house_form = HouseForm(request.POST, request.FILES, landlord=landlord)
    additional_images = request.FILES.getlist('additional_images')  # ensure frontend uses this key

    if house_form.is_valid():
        house = house_form.save()
        add_images_to_house(house.id, additional_images)
        return Response({'success': True, 'message': 'House added successfully!'})
    else:
        return Response({'success': False, 'errors': house_form.errors}, status=status.HTTP_400_BAD_REQUEST)


class HouseChoiceAPIView(APIView):
    authentication_classes = []  # Disable authentication for this view
    permission_classes = [AllowAny]  # Disable permissions for this view
    def get(self, request):
        serializer = HouseChoiceSerializer(instance={})
        return Response(serializer.data)

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



#THE ABOUT US DONATION

# @csrf_exempt
# def stk_push(request):
#     if request.method == "POST":
#         phone = request.POST.get('phone_number')
#         amount = request.POST.get('amount')

#         access_token = MpesaAccessToken.validated_token

#         api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
#         headers = {"Authorization": "Bearer %s" % access_token}

#         payload = {   
#             "BusinessShortCode": MpesaPassword.shortcode,    
#             "Password": MpesaPassword.decoded_password,    
#             "Timestamp": MpesaPassword.timestamp,    
#             "TransactionType": "CustomerPayBillOnline",    
#             "Amount": amount,    
#             "PartyA": phone,    
#             "PartyB": MpesaPassword.shortcode,    
#             "PhoneNumber": phone,    
#             "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",   
#             "AccountReference": "ApartmateMe", 
#             "TransactionDesc": "ApartmateMe"
#         }
#         try:
#             response = requests.post(api_url, json=payload, headers=headers)
#             if response.status_code == 200:
#                 return JsonResponse({"success": True, "message": "STK push initiated", "data": response.json()})
#             else:
#                 return JsonResponse({"success": False, "message": "Failed to initiate STK push", "error": response.text}, status=400)
#         except Exception as e:
#             return JsonResponse({"success": False, "message": str(e)}, status=500)
#     return JsonResponse({"success": False, "message": "Invalid request method"}, status=405)

# @csrf_exempt
# def mpesa_callback(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
            
#             # Extract whatever info you want from the callback data
#             transaction_status = data.get("Body", {}).get("stkCallback", {}).get("ResultDesc", "No result description")
#             amount = data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [{}])[0].get("Value", "N/A")
#             phone = None

#             # Find phone number in callback metadata items if present
#             callback_items = data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [])
#             for item in callback_items:
#                 if item.get("Name") == "PhoneNumber":
#                     phone = item.get("Value")
#                     break

#             # Build email subject and message
#             subject = "New M-Pesa Payment Notification"
#             message = (
#                 f"Payment Status: {transaction_status}\n"
#                 f"Amount: {amount}\n"
#                 f"Phone Number: {phone}\n"
#                 f"Full Callback Data:\n{json.dumps(data, indent=2)}"
#             )

#             # Send email to you
#             send_mail(
#                 subject,
#                 message,
#                 "mukoshijabez@gmail.com", 
#                 ["mukoshijabez@gmail.com"],
#                 fail_silently=False,
#             )
            
#             # Return success to M-Pesa
#             return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})
        
#         except Exception as e:
#             print(f"Error in mpesa_callback: {e}")
#             return JsonResponse({"ResultCode": 1, "ResultDesc": "Rejected"})

#     return JsonResponse({"ResultCode": 1, "ResultDesc": "Rejected"})


@csrf_exempt
def stk_push(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Accept JSON body from frontend
            phone = data.get('phone_number')
            amount = data.get('amount')

            if not phone or not amount:
                return JsonResponse({"success": False, "message": "Phone number and amount are required"}, status=400)

            access_token = MpesaAccessToken.validated_token

            api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            headers = {"Authorization": f"Bearer {access_token}"}

            payload = {
                "BusinessShortCode": MpesaPassword.shortcode,
                "Password": MpesaPassword.decoded_password,
                "Timestamp": MpesaPassword.timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": MpesaPassword.shortcode,
                "PhoneNumber": phone,
                "CallBackURL": "https://sandbox.safaricom.co.ke/mpesa/",   
                "AccountReference": "ApartmateMe",
                "TransactionDesc": "ApartmateMe"
            }

            response = requests.post(api_url, json=payload, headers=headers)

            if response.status_code == 200:
                return JsonResponse({
                    "success": True,
                    "message": "STK push initiated",
                    "data": response.json()
                })
            else:
                return JsonResponse({
                    "success": False,
                    "message": "Failed to initiate STK push",
                    "error": response.text
                }, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"success": False, "message": "Invalid request method"}, status=405)



@csrf_exempt
def mpesa_callback(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            stk_callback = data.get("Body", {}).get("stkCallback", {})
            result_desc = stk_callback.get("ResultDesc", "No result description")
            metadata = stk_callback.get("CallbackMetadata", {}).get("Item", [])

            amount = None
            phone = None

            for item in metadata:
                if item.get("Name") == "Amount":
                    amount = item.get("Value")
                if item.get("Name") == "PhoneNumber":
                    phone = item.get("Value")

            subject = "New M-Pesa Payment Notification"
            message = (
                f"Payment Status: {result_desc}\n"
                f"Amount: {amount}\n"
                f"Phone Number: {phone}\n\n"
                f"Full Callback Data:\n{json.dumps(data, indent=2)}"
            )

            send_mail(
                subject,
                message,
                "mukoshijabez@gmail.com",  # From
                ["mukoshijabez@gmail.com"],  # To
                fail_silently=False,
            )

            return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})

        except Exception as e:
            print(f"Callback error: {e}")
            return JsonResponse({"ResultCode": 1, "ResultDesc": "Rejected"})

    return JsonResponse({"ResultCode": 1, "ResultDesc": "Rejected"})














def thank_you(request):
    return render(request, 'stk/thanks.html')

def stk_error(request):
    return render(request, 'stk/stkerror.html' )

@csrf_exempt
def donate(request):
    return render(request, 'stk/donate.html')

