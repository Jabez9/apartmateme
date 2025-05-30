from django.shortcuts import  redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.hashers import make_password, check_password
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator, default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from app1.models import Landlord, House
from django.contrib.auth.views import PasswordResetDoneView, PasswordResetCompleteView
from django.contrib.auth.forms import SetPasswordForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from app1.serializers import HouseSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView
from django.core.exceptions import PermissionDenied
import logging
logger = logging.getLogger(__name__)



# REGISTER FUNCTION
@csrf_exempt
def api_register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()

            if not all([name, email, password]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            if Landlord.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email is already registered.'}, status=400)

            landlord = Landlord(
                name=name,
                email=email,
                password=make_password(password)
            )
            landlord.save()

            return JsonResponse({'message': 'Registration successful!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)

    return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)

# LOGIN FUNCTION
@csrf_exempt
def landlord_login_api(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        try:
            landlord = Landlord.objects.get(email=email)

            if check_password(password, landlord.password):
                refresh = RefreshToken.for_user(landlord)
                return JsonResponse({
                    'message': 'Login successful',
                    'landlord_id': landlord.id,
                    'name': landlord.name,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except Landlord.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

# LOGOUT FUNCTION
def logout(request):
    # Clear the session to log out the user
    request.session.flush()

    # Add a success message
    messages.success(request, "You have successfully logged out.")

    # Redirect to the login page
    return redirect('login')



token_generator = PasswordResetTokenGenerator()

#next frontend
@csrf_exempt  # Only if you're not handling CSRF tokens on the frontend; otherwise, handle properly
def forgot_password_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email', '').strip()
            if not email:
                return JsonResponse({'error': 'Email is required.'}, status=400)

            landlord = Landlord.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(landlord.id))
            token = token_generator.make_token(landlord)
            reset_url = f'{settings.FRONTEND_URL}/users/reset_password/{uid}/{token}/'

            send_mail(
                'Reset Your ApartmateME Password',
                f'Click the link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            return JsonResponse({'message': 'Password reset link sent to your email.'})
        except Landlord.DoesNotExist:
            return JsonResponse({'error': 'Email not found.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)

   

#next frontend for reset password
@csrf_exempt  # Use proper CSRF if your frontend supports it
def reset_password_api(request, uidb64, token):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        new_password1 = data.get('new_password1')
        new_password2 = data.get('new_password2')
        if not new_password1 or not new_password2:
            return JsonResponse({'error': 'Both password fields are required.'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON.'}, status=400)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        landlord = Landlord.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Landlord.DoesNotExist):
        return JsonResponse({'error': 'Invalid user.'}, status=400)

    token_generator = default_token_generator  # or your custom token_generator

    if not token_generator.check_token(landlord, token):
        return JsonResponse({'error': 'Invalid or expired token.'}, status=400)

    # Use Django's SetPasswordForm to validate password rules
    form = SetPasswordForm(landlord, {
        'new_password1': new_password1,
        'new_password2': new_password2,
    })

    if form.is_valid():
        form.save()
        return JsonResponse({'message': 'Password has been reset successfully.'})
    else:
        # Return form errors
        errors = form.errors.get_json_data()
        return JsonResponse({'errors': errors}, status=400)
    

# Custom password reset views for proper template rendering
class CustomPasswordResetDoneView(PasswordResetDoneView):
    template_name = 'password_reset_done.html'


class CustomPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = 'password_reset_complete.html'



@api_view(['GET'])
def fetch_landlord_houses_api(request):
    landlord_id = request.session.get('landlord_id')
    if not landlord_id:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    landlord = get_object_or_404(Landlord, id=landlord_id)
    houses = House.objects.filter(landlord=landlord)
    serializer = HouseSerializer(houses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_landlord_house_api(request):
    landlord_id = request.session.get('landlord_id')
    if not landlord_id:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    landlord = get_object_or_404(Landlord, id=landlord_id)

    # Deserialize request data
    serializer = HouseSerializer(data=request.data)
    if serializer.is_valid():
        # Assign landlord before saving
        serializer.save(landlord=landlord)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


logger = logging.getLogger(__name__)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def landlord_houses_api(request):
    """
    GET: Return houses owned by the logged-in landlord or all houses if the user is an admin.
    POST: Create a house for the logged-in landlord (admins cannot create directly here).
    """
    user = request.user

    # GET request
    if request.method == 'GET':
        if user.is_staff:
            # Admin: return all houses
            houses = House.objects.all()
        else:
            # Landlord: get houses for this landlord
            try:
                landlord = Landlord.objects.get(email=user.email)
            except Landlord.DoesNotExist:
                return Response({'error': 'Landlord profile not found'}, status=status.HTTP_404_NOT_FOUND)
            houses = House.objects.filter(landlord=landlord)

        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data)

    # POST request
    elif request.method == 'POST':
        if user.is_staff:
            return Response({'error': 'Admins are not allowed to create houses via this endpoint.'},
                            status=status.HTTP_403_FORBIDDEN)

        try:
            landlord = Landlord.objects.get(email=user.email)
        except Landlord.DoesNotExist:
            return Response({'error': 'Landlord profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = HouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(landlord=landlord)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LandlordHouseDetailView(RetrieveUpdateAPIView):
    serializer_class = HouseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return House.objects.all()
        try:
            landlord = Landlord.objects.get(email=user.email)
        except Landlord.DoesNotExist:
            return House.objects.none()
        return House.objects.filter(landlord=landlord)

    def get_object(self):
        obj = super().get_object()
        user = self.request.user

        # Only allow landlord to access their house
        if not user.is_staff and obj.landlord.email != user.email:
            raise PermissionDenied("You do not have permission to access this house.")
        return obj