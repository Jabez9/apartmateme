from django.db import models
from django.utils import timezone
from .utils import house_main_image_upload_to
import os 
from django.conf import settings

# Create your models here.
class Landlord(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=16)
    repeat_pass = models.CharField(max_length=16)
      
      
    def __str__(self):
        return self.name
    
# # model to register houses
# class House(models.Model):
#               # Status choices
#           STATUS_CHOICES = [
#               ('Available', 'Available'),
#               ('Occupied', 'Occupied'),
#               ('For Sale', 'For Sale')
#           ]
      
#           # Type choices
#           TYPE_CHOICES = [
#               ('Bedsitter', 'Bedsitter'),
#               ('One Bedroom', 'One Bedroom'),
#               ('Two Bedroom', 'Two Bedroom'),
#               ('Apartment', 'Apartment'),
#               ('Shop', 'Shop'),
#           ]
      
#           # Location Choices 
#           LOCATION_CHOICES = [
#               ('Ole Kasasi A', 'Ole Kasasi A'),
#               ('Ole Kasasi B','Ole Kasasi B'),
#               ('Tumaini','Tumaini'),
#               ('Sironik Road','Sironik Road'),
#               ('Mayor Road','Mayor Road'),
#               ('Masai Lodge Road','Masai Lodge Road'),
#               ('Naivas','Naivas'),
#               ('Tuskys','Tuskys'),
#               ('Kware','Kware'),
#               ('Gataka Road','Gataka Road')
#           ]
      
      
#           landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE,related_name="houses")
#           name = models.CharField(max_length=100)
#           type= models.CharField(max_length=30, choices=TYPE_CHOICES)
#           status = models.CharField(max_length=30,choices=STATUS_CHOICES )
#           location = models.CharField(max_length=40, choices=LOCATION_CHOICES)
#           dateadded = models.DateTimeField(default=timezone.now)
#         #   images = models.ImageField(upload_to='NewHouses/')
      
      
#           def __str__(self):
#               return f"{self.name} ({self.type}) - {self.status} {self.location}"
          
#           def landlord_name(self):
#               return self.landlord.name
#           landlord_name.short_description = 'Owner'


# class HouseImage(models.Model):
#     house = models.ForeignKey(House, related_name='images', on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='NewHouses/')
#     #description = models.CharField(max_length=255, blank=True, null=True)
#     description = models.TextField()

#     def __str__(self):
#         return f"Image for {self.house.name}"
          



# class House(models.Model):
#     landlord = models.ForeignKey('Landlord', on_delete=models.CASCADE, related_name="houses")
#     name = models.CharField(max_length=100)
#     type = models.CharField(max_length=30, choices=[
#         ('Bedsitter', 'Bedsitter'),
#         ('One Bedroom', 'One Bedroom'),
#         ('Two Bedroom', 'Two Bedroom'),
#         ('Apartment', 'Apartment'),
#         ('Shop', 'Shop'),
#     ])
#     status = models.CharField(max_length=30, choices=[
#         ('Available', 'Available'),
#         ('Occupied', 'Occupied'),
#         ('For Sale', 'For Sale'),
#     ])
#     location = models.CharField(max_length=40, choices=[
#         ('Ole Kasasi A', 'Ole Kasasi A'),
#         ('Ole Kasasi B', 'Ole Kasasi B'),
#         ('Tumaini', 'Tumaini'),
#         ('Sironik Road', 'Sironik Road'),
#         ('Mayor Road', 'Mayor Road'),
#         ('Masai Lodge Road', 'Masai Lodge Road'),
#         ('Naivas', 'Naivas'),
#         ('Tuskys', 'Tuskys'),
#         ('Kware', 'Kware'),
#         ('Gataka Road', 'Gataka Road'),
#     ])
#     price_range = models.ManyToManyField(PriceRange, related_name="houses", blank=True)
#     main_photo = models.ImageField(upload_to='houses/main_photos/', blank=True, null=True)
#     date_added = models.DateTimeField(auto_now_add=True)
#     price_ranges = models.ManyToManyField(PriceRange, related_name="houses", blank=True)
#     # This allows for multiple price ranges to be selected


#     def __str__(self):
#         return f"{self.name} ({self.type}) - {self.status} in {self.location}"


# class PriceRange(models.Model):
#     price = models.PositiveIntegerField(unique=True, help_text="Enter price as an integer value (e.g., 7000)")

#     def __str__(self):
#         return f"KSh {self.price}"

# class House(models.Model):
#     STATUS_CHOICES = [
#         ('Available', 'Available'),
#         ('Occupied', 'Occupied'),
#         ('For Sale', 'For Sale')
#     ]
    
#     TYPE_CHOICES = [
#         ('Bedsitter', 'Bedsitter'),
#         ('One Bedroom', 'One Bedroom'),
#         ('Two Bedroom', 'Two Bedroom'),
#         ('Apartment', 'Apartment'),
#         ('Shop', 'Shop'),
#     ]
    
#     LOCATION_CHOICES = [
#         ('Ole Kasasi A', 'Ole Kasasi A'),
#         ('Ole Kasasi B', 'Ole Kasasi B'),
#         ('Tumaini', 'Tumaini'),
#         ('Sironik Road', 'Sironik Road'),
#         ('Mayor Road', 'Mayor Road'),
#         ('Masai Lodge Road', 'Masai Lodge Road'),
#         ('Naivas', 'Naivas'),
#         ('Tuskys', 'Tuskys'),
#         ('Kware', 'Kware'),
#         ('Gataka Road', 'Gataka Road')
#     ]
    
#     landlord = models.ForeignKey('Landlord', on_delete=models.CASCADE, related_name="houses")
#     name = models.CharField(max_length=100)
#     type = models.CharField(max_length=30, choices=TYPE_CHOICES)
#     status = models.CharField(max_length=30, choices=STATUS_CHOICES)
#     location = models.CharField(max_length=40, choices=LOCATION_CHOICES)
#     dateadded = models.DateTimeField(default=timezone.now)
#     main_image = models.ImageField(upload_to=house_main_image_upload_to, null=True, blank=True)  # Main image field
#     price_ranges = models.ManyToManyField('PriceRange', related_name="houses", blank=True)  # Price ranges
#     # other fields as needed (like description)

#     def __str__(self):
#         return f"{self.name} - {self.location} ({self.status} in {self.location})"



class PriceRange(models.Model):
    price = models.PositiveIntegerField(unique=True, help_text="Enter price as an integer value (e.g., 7000)")

    def __str__(self):
        return f"KSh {self.price}"
    


class House(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Occupied', 'Occupied'),
        ('For Sale', 'For Sale')
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
        ('Gataka Road', 'Gataka Road')
    ]

    landlord = models.ForeignKey('Landlord', on_delete=models.CASCADE, related_name="houses")
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Occupied')
    location = models.CharField(max_length=40, choices=LOCATION_CHOICES)
    dateadded = models.DateTimeField(default=timezone.now)
    main_image = models.ImageField(
        upload_to=house_main_image_upload_to,
        null=True,
        blank=True,
        help_text="Upload the main image for the house"
    )
    price_ranges = models.ManyToManyField('PriceRange', related_name="houses", blank=True)

    class Meta:
        ordering = ['-dateadded']

    def save(self, *args, **kwargs):
        # Check if the house name has changed
        if self.pk:  # Only for existing objects
            old_instance = House.objects.get(pk=self.pk)
            if old_instance.name != self.name:
                # Define old and new folder paths
                old_folder = os.path.join(settings.MEDIA_ROOT, 'houses', old_instance.name)
                new_folder = os.path.join(settings.MEDIA_ROOT, 'houses', self.name)
                
                # Rename the folder
                if os.path.exists(old_folder):
                    os.rename(old_folder, new_folder)
                
                # Update the paths of related files
                if self.main_image:
                    old_image_path = self.main_image.path
                    new_image_path = old_image_path.replace(old_folder, new_folder)
                    os.makedirs(os.path.dirname(new_image_path), exist_ok=True)
                    os.rename(old_image_path, new_image_path)
                    self.main_image.name = self.main_image.name.replace(f"houses/{old_instance.name}/", f"houses/{self.name}/")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.location} ({self.type} {self.status} {self.price_ranges})"


from .utils import house_image_upload_to

class HouseImage(models.Model):
    house = models.ForeignKey(House, related_name='images', on_delete=models.CASCADE)
    # image = models.ImageField(upload_to='houses/other/')
    image = models.ImageField(upload_to=house_image_upload_to)  # Use the custom upload_to function
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Image for {self.house.name}"
