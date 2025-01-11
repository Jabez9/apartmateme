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
    
# from django.contrib import admin
# from .models import Landlord, House, HouseImage, Rent, Type

# # Register your Landlord model
# @admin.register(Landlord)
# class LandlordAdmin(admin.ModelAdmin):
#     list_display = ('name', 'email')  # Display landlord name and email
#     search_fields = ('name', 'email')  # Allow searching by name and email

# # Admin handling for multiple images uploaded
# class HouseImageInline(admin.TabularInline):
#     model = HouseImage
#     extra = 1  # Number of empty forms to display by default

# @admin.register(House)
# class HouseAdmin(admin.ModelAdmin):
#     # List of fields to display in the admin panel
#     list_display = ['name', 'get_types', 'get_rents', 'status', 'location', 'landlord_name', 'dateadded']
    
#     # Enable searching by name, location, and landlord's name
#     search_fields = ('name', 'location', 'landlord__name')
    
#     # Filters for status, type, and location
#     list_filter = ('status', 'type', 'rent', 'location')

#     # Inline for managing multiple images for a house
#     inlines = [HouseImageInline]

#     @admin.display(description='Landlord')
#     def landlord_name(self, obj):
#         return obj.landlord.name

#     @admin.display(description='Type')
#     def get_types(self, obj):
#         return ", ".join([type_obj.name for type_obj in obj.types.all()])

#     @admin.display(description='Rent')
#     def get_rents(self, obj):
#         return ", ".join([str(rent.amount) for rent in obj.rents.all()])


