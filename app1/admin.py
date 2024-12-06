
from django.contrib import admin
from .models import Landlord, House, HouseImage

# Register your Landlord model
@admin.register(Landlord)
class LandlordAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')  # Display landlord name and email
    search_fields = ('name', 'email')  # Allow searching by name and email



# Admin handling for multiple images uploaded
class HouseImageInline(admin.TabularInline):
    model = HouseImage
    extra = 1  # Number of empty forms to display by default



# Register your House model with custom display
@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'status', 'location', 'landlord_name', 'dateadded')  # Add landlord_name here
    search_fields = ('name', 'location', 'landlord__name')  # Enable searching by landlord's name
    list_filter = ('status', 'type', 'location')  # Add filters for the admin list view
    inlines = [HouseImageInline]

#admin handling for multiple images uploaded