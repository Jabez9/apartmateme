from django import forms
from .models import Landlord

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Your Name',
        'required': True,
    }))
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'Your Email',
        'required': True,
    }))
    subject = forms.CharField(max_length=200, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Subject',
        'required': True,
    }))
    message = forms.CharField(widget=forms.Textarea(attrs={
        'class': 'form-control',
        'placeholder': 'Message',
        'rows': 6,
        'required': True,
    }))

#handling form for multiple images
from .models import House, HouseImage, PriceRange

# class HouseForm(forms.ModelForm):
#     class Meta:
#         model = House
#         fields = ['landlord', 'name', 'type', 'status', 'location', 'dateadded']

#     def __init__(self, *args, **kwargs):
#         # Extract the landlord instance passed to the form
#         self.landlord = kwargs.pop('landlord', None)  
#         super().__init__(*args, **kwargs)
        
#         if self.landlord:
#             # Set the landlord field to be pre-filled with the logged-in landlord
#             self.fields['landlord'].initial = self.landlord
#             # Make the field read-only (uneditable)
#             # self.fields['landlord'].widget = forms.TextInput(attrs={'class': 'form-control', 'readonly': 'readonly'})

#             self.fields['landlord'].widget = forms.HiddenInput()  # Hides the field

#             # Optionally, you can disable the field if you want to prevent interaction
#             self.fields['landlord'].disabled = True

#         # Hide the 'dateadded' field using HiddenInput widget
#         self.fields['dateadded'].widget = forms.HiddenInput()
#         self.fields['dateadded'].disabled = True  # Optionally disable the field if you want to prevent interaction



#     def clean_landlord(self):
#         landlord = self.cleaned_data.get('landlord')
#         if self.landlord and landlord != self.landlord:
#             raise forms.ValidationError("You can only create houses for your own account.")
#         return landlord
#     #above fxn checks if the landlord matches the one logged in 


class HouseForm(forms.ModelForm):
    class Meta:
        model = House
        fields = ['landlord', 'name', 'type', 'status', 'location', 'dateadded', 'price_ranges', 'main_image']

    price_ranges= forms.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        required=True,
        widget=forms.NumberInput(attrs={'class': 'form-control'}),
        label="Price Range (e.g. 7000.00)"
    )

    def __init__(self, *args, **kwargs):
        # Extract the landlord instance passed to the form
        self.landlord = kwargs.pop('landlord', None)
        super().__init__(*args, **kwargs)
        
        if self.landlord:
            # Set the landlord field to be pre-filled with the logged-in landlord
            self.fields['landlord'].initial = self.landlord
            # Make the field read-only or hidden as needed
            self.fields['landlord'].widget = forms.HiddenInput()  # Hides the field
            self.fields['landlord'].disabled = True  # Optionally, you can disable the field

        else:
            raise forms.ValidationError("Landlord not specified.")  # Ensure 'landlord' is provided

        # Hide and disable the 'dateadded' field (pre-fill with the current date)
        self.fields['dateadded'].widget = forms.HiddenInput()
        self.fields['dateadded'].disabled = True  # Optionally disable the field to prevent interaction

    def clean_landlord(self):
        landlord = self.cleaned_data.get('landlord')
        # Check that the landlord matches the logged-in user
        if self.landlord and landlord != self.landlord:
            raise forms.ValidationError("You can only create houses for your own account.")
        return landlord

class HouseImageForm(forms.ModelForm):
    images = forms.ImageField(
        widget=forms.ClearableFileInput(attrs={'multiple': True}),
        required=True
    )
    description = forms.CharField(widget=forms.Textarea, required=False)
    
    def clean_images(self):
        images = self.files.getlist('images')
        if len(images) > 5:
            raise forms.ValidationError("You can upload up to 5 images only.")
        return images

    class Meta:
        model = HouseImage
        # fields = ['image', 'description']
        fields = ['description']  # 'images' is handled separately and not part of the model fields


# EDITTING A LANDLORD
class LandlordEditForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ['email', 'password']

#ADDING A LANDLORD
class LandlordForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ['name', 'email', 'password', 'repeat_pass']
