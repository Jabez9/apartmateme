from django.db import models
from django.db.models import JSONField
from django.utils import timezone
from .utils import house_main_image_upload_to, house_image_upload_to
import os
from django.conf import settings
from PIL import Image
import io
from django.core.files.base import ContentFile
import logging
import shutil
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
logger = logging.getLogger(__name__)
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

def convert_image_to_webp(image_field):
    try:
        image_field.open()
        img = Image.open(image_field)
        img = img.convert("RGB")
        img_io = io.BytesIO()
        img.save(img_io, format='WEBP', quality=80)
        img_io.seek(0)
        
        base_path = os.path.splitext(image_field.name)[0]
        webp_name = base_path + '.webp'
        
        # Replace content but keep the original folder path, only extension changes
        image_field.file = ContentFile(img_io.read(), name=webp_name)
        image_field.name = webp_name
        return image_field
    except Exception as e:
        logger.error(f"Error converting image to WebP: {e}")
        return image_field


class LandlordManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class Landlord(AbstractUser):
    username = None  # remove the username field
    name = models.CharField(max_length=100)
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = LandlordManager()  # use your custom manager

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete each related house explicitly to trigger their delete()
        for house in self.houses.all():
            house.delete()
        super().delete(*args, **kwargs)
        
    def __str__(self):
        return self.name



class House(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Occupied', 'Occupied'),
        ('For Sale', 'For Sale'),
    ]

    TYPE_CHOICES = [
        ('Bedsitter', 'Bedsitter'),
        ('One Bedroom', 'One Bedroom'),
        ('Two Bedroom', 'Two Bedroom'),
        ('Apartment', 'Apartment'),
        ('Shop', 'Shop'),
    ]

    LOCATION_CHOICES = [
        ('Ole Kasasi A', 'Ole Kasasi A'),
        ('Ole Kasasi B', 'Ole Kasasi B'),
        ('Tumaini', 'Tumaini'),
        ('Sironik Road', 'Sironik Road'),
        ('Mayor Road', 'Mayor Road'),
        ('Masai Lodge Road', 'Masai Lodge Road'),
        ('Naivas', 'Naivas'),
        ('Tuskys', 'Tuskys'),
        ('Kware', 'Kware'),
        ('Gataka Road', 'Gataka Road'),
    ]

    RENT_CHOICES = [
        (str(amount), str(amount)) for amount in range(6500, 30500, 500)
    ]

    landlord = models.ForeignKey(
        'Landlord', on_delete=models.CASCADE, related_name="houses"
    )
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Occupied')
    location = models.CharField(max_length=40, choices=LOCATION_CHOICES)
    coordinates = models.CharField(max_length=100, blank=True, null=True)
    dateadded = models.DateTimeField(default=timezone.now)
    main_image = models.ImageField(
        upload_to=house_main_image_upload_to,
        null=True,
        blank=True,
        help_text="Upload the main image for the house",
    )
    type = JSONField()
    rent = JSONField()
    agent_name = models.CharField(max_length=100)
    agent_phone = models.CharField(max_length=20)
    description = models.TextField(blank=True, null=True)
    pros = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-dateadded']

    def save(self, *args, **kwargs):
        if self.pk:
            old_instance = House.objects.get(pk=self.pk)
            if old_instance.name != self.name:
                old_folder = os.path.join(settings.MEDIA_ROOT, 'houses', old_instance.name)
                new_folder = os.path.join(settings.MEDIA_ROOT, 'houses', self.name)
                if os.path.exists(old_folder):
                    os.rename(old_folder, new_folder)
                if self.main_image and os.path.exists(self.main_image.path):
                    old_image_path = self.main_image.path
                    new_image_path = old_image_path.replace(old_folder, new_folder)
                    os.makedirs(os.path.dirname(new_image_path), exist_ok=True)
                    os.rename(old_image_path, new_image_path)
                    self.main_image.name = self.main_image.name.replace(
                        f"houses/{old_instance.name}/", f"houses/{self.name}/"
                    )

        # Convert main_image on the fly before saving
        if self.main_image and hasattr(self.main_image.file, 'file'):
            self.main_image = convert_image_to_webp(self.main_image)

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.main_image and os.path.isfile(self.main_image.path):
            # This gets something like: /path/to/media/houses/HouseName/main/main_image.webp
            # We want to delete the HouseName folder, which is 2 levels up from the file path
            house_folder = os.path.abspath(
                os.path.join(self.main_image.path, "../../")
            )
            if os.path.exists(house_folder):
                shutil.rmtree(house_folder)
        super().delete(*args, **kwargs)
    

    def __str__(self):
        return f"{self.name} - {self.location} ({self.type}, {self.status}, {self.rent})"


class HouseImage(models.Model):
    house = models.ForeignKey(
        House, related_name='images', on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to=house_image_upload_to)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.pk:
            old_instance = HouseImage.objects.get(pk=self.pk)
            if old_instance.image != self.image:
                old_instance.image.delete(save=False)

        # Convert image on the fly before saving
        if self.image and hasattr(self.image.file, 'file'):
            self.image = convert_image_to_webp(self.image)

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.house.name}"
