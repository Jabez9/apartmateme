from django.db import models
from django.utils import timezone

# Create your models here.
class Landlord(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=16)
    repeat_pass = models.CharField(max_length=16)
      
      
    def __str__(self):
        return self.name
    
# model to register houses
class House(models.Model):
              # Status choices
          STATUS_CHOICES = [
              ('Available', 'Available'),
              ('Occupied', 'Occupied'),
              ('For Sale', 'For Sale')
          ]
      
          # Type choices
          TYPE_CHOICES = [
              ('Bedsitter', 'Bedsitter'),
              ('One Bedroom', 'One Bedroom'),
              ('Two Bedroom', 'Two Bedroom'),
              ('Apartment', 'Apartment'),
              ('Shop', 'Shop'),
          ]
      
          # Location Choices 
          LOCATION_CHOICES = [
              ('Ole Kasasi A', 'Ole Kasasi A'),
              ('Ole Kasasi B','Ole Kasasi B'),
              ('Tumaini','Tumaini'),
              ('Sironik Road','Sironik Road'),
              ('Mayor Road','Mayor Road'),
              ('Masai Lodge Road','Masai Lodge Road'),
              ('Naivas','Naivas'),
              ('Tuskys','Tuskys'),
              ('Kware','Kware'),
              ('Gataka Road','Gataka Road')
          ]
      
      
          landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE,related_name="houses")
          name = models.CharField(max_length=100)
          type= models.CharField(max_length=30, choices=TYPE_CHOICES)
          status = models.CharField(max_length=30,choices=STATUS_CHOICES )
          location = models.CharField(max_length=40, choices=LOCATION_CHOICES)
          dateadded = models.DateTimeField(default=timezone.now)
        #   images = models.ImageField(upload_to='NewHouses/')
      
      
          def __str__(self):
              return f"{self.name} ({self.type}) - {self.status} {self.location}"
          
          def landlord_name(self):
              return self.landlord.name
          landlord_name.short_description = 'Owner'


class HouseImage(models.Model):
    house = models.ForeignKey(House, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='NewHouses/')
    #description = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return f"Image for {self.house.name}"
          
    