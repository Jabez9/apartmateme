from django.contrib import admin
from .models import Landlord,House, HouseImage

# Register your Landlord model
@admin.register(Landlord)
class LandlordAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')  # Display landlord name and email
    search_fields = ('name', 'email')  # Allow searching by name and email

# Admin handling for multiple images uploaded
class HouseImageInline(admin.TabularInline):
    model = HouseImage
    extra = 1  # Number of empty forms to display by default

@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    # List of fields to display in the admin panel
    list_display = ['name', 'type', 'status', 'location', 'landlord_name', 'dateadded']
    
    # Enable searching by name, location, and landlord's name
    search_fields = ('name', 'location', 'landlord__name')
    
    # Filters for status, type, and location
    list_filter = ('status', 'type', 'location')

    # Inline for managing multiple images for a house
    inlines = [HouseImageInline]

    @admin.display(description='Landlord')
    def landlord_name(self, obj):
        return obj.landlord.name
    
