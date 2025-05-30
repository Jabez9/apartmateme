from rest_framework import serializers
from .models import House, HouseImage, Landlord


class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = ['id', 'image', 'description']


class HouseSerializer(serializers.ModelSerializer):
    # For reading/displaying images
    images = HouseImageSerializer(many=True, read_only=True)

    # Include landlord name
    landlord = serializers.SerializerMethodField()

    # For uploading additional images
    additional_images = serializers.ListField(
        child=serializers.ImageField(), 
        write_only=True, 
        required=False
    )

    class Meta:
        model = House
        fields = [
            'id', 'landlord', 'name', 'status', 'location', 'coordinates',
            'dateadded', 'main_image', 'type', 'rent', 'agent_name',
            'agent_phone', 'description', 'pros',
            'images', 'additional_images',
        ]
        read_only_fields = ['dateadded', 'landlord', 'images']

    def get_landlord(self, obj):
        if obj.landlord:
            return {
                'id': obj.landlord.id,
                'name': obj.landlord.name,
            }
        return None
    
    def create(self, validated_data):
        additional_images = validated_data.pop('additional_images', [])
        house = House.objects.create(**validated_data)
        for image in additional_images:
            HouseImage.objects.create(house=house, image=image)
        return house

    def update(self, instance, validated_data):
        additional_images = validated_data.pop('additional_images', [])
        instance = super().update(instance, validated_data)
        for image in additional_images:
            HouseImage.objects.create(house=instance, image=image)
        return instance

class HouseChoiceSerializer(serializers.Serializer):
    type_choices = serializers.SerializerMethodField()
    status_choices = serializers.SerializerMethodField()
    location_choices = serializers.SerializerMethodField()
    rent_choices = serializers.SerializerMethodField()

    def get_type_choices(self, obj):
        return [{"value": v, "label": l} for v, l in House.TYPE_CHOICES]

    def get_status_choices(self, obj):
        return [{"value": v, "label": l} for v, l in House.STATUS_CHOICES]

    def get_location_choices(self, obj):
        return [{"value": v, "label": l} for v, l in House.LOCATION_CHOICES]

    def get_rent_choices(self, obj):
        return [{"value": v, "label": l} for v, l in House.RENT_CHOICES]

    
class LandlordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)  # <-- required False for update

    class Meta:
        model = Landlord
        fields = ['id', 'name', 'email', 'password']

    def create(self, validated_data):
        landlord = Landlord(
            name=validated_data['name'],
            email=validated_data['email'],
        )
        landlord.password = validated_data['password']  # your model hashes on save
        landlord.save()
        return landlord

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        if password:
            instance.password = password
        instance.save()
        return instance
