from django.shortcuts import  get_object_or_404
from django.contrib.auth.decorators import  user_passes_test
from app1.models import Landlord, House
from app1.serializers import LandlordSerializer, HouseSerializer
from app1.views import get_s3_url  # Assuming this fetches image URL from S3
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

# Utility: Ensure only superusers (true admins) can access certain views
def admin_required(view_func):
    return user_passes_test(lambda u: u.is_authenticated and u.is_superuser)(view_func)

# ─────────────────────────────────────────────────────────────
# HOUSE VIEWS
# ─────────────────────────────────────────────────────────────
@api_view(['GET'])
@permission_classes([IsAdminUser])
def house_list_api(request):
    houses = House.objects.select_related('landlord').prefetch_related('images').all()
    serializer = HouseSerializer(houses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def house_details_api(request, house_id):
    house = get_object_or_404(House.objects.select_related('landlord').prefetch_related('images'), id=house_id)
    serializer = HouseSerializer(house)
    return Response(serializer.data)



@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_house_api(request, house_id):
    house = get_object_or_404(House, id=house_id)
    house.delete()
    return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
# ─────────────────────────────────────────────────────────────
# LANDLORD VIEWS
# ─────────────────────────────────────────────────────────────


@api_view(['GET'])
@permission_classes([IsAdminUser])
def landlord_list_api(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Adjust page size as needed
    landlords = Landlord.objects.all()
    result_page = paginator.paginate_queryset(landlords, request)
    serializer = LandlordSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_landlord(request):
    serializer = LandlordSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Landlord added successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT', 'PATCH'])
@permission_classes([IsAdminUser])
def edit_landlord_api(request, landlord_id):
    try:
        landlord = Landlord.objects.get(id=landlord_id)
    except Landlord.DoesNotExist:
        return Response({'detail': 'Landlord not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = LandlordSerializer(landlord, data=request.data, partial=(request.method == 'PATCH'))
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_landlord_api(request, landlord_id):
    try:
        landlord = Landlord.objects.get(id=landlord_id)
    except Landlord.DoesNotExist:
        return Response({'detail': 'Landlord not found'}, status=status.HTTP_404_NOT_FOUND)

    landlord.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_landlord_houses_api(request, landlord_id):
    try:
        landlord = Landlord.objects.get(id=landlord_id)
    except Landlord.DoesNotExist:
        return Response({'detail': 'Landlord not found'}, status=status.HTTP_404_NOT_FOUND)

    houses = House.objects.filter(landlord=landlord)
    houses_serializer = HouseSerializer(houses, many=True)
    landlord_serializer = LandlordSerializer(landlord)

    return Response({
        'landlord': landlord_serializer.data,
        'houses': houses_serializer.data
    }, status=status.HTTP_200_OK)

# ─────────────────────────────────────────────────────────────
# CUSTOM ADMIN DASHBOARD
# ─────────────────────────────────────────────────────────────

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Authenticate using JWT
@permission_classes([IsAdminUser])             # Only allow admin/superuser access
def admin_dashboard(request):
    return Response({
        "message": f"Welcome, Admin {request.user.username}!",
        "email": request.user.email,
        "user_id": request.user.id,
        "is_superuser": request.user.is_superuser,
    })


@csrf_exempt
def admin_login_api(request):
    if request.method != "POST":
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_superuser:
            # Create JWT token
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Login successful',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'username': user.username,
            })
        else:
            return JsonResponse({'message': 'Invalid credentials or not admin'}, status=401)
    except Exception as e:
        return JsonResponse({'message': 'Invalid request'}, status=400)