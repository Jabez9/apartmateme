from django import forms
from app1.models import HouseImage,Landlord
class HouseImageForm(forms.ModelForm):
    images = forms.ImageField(
        widget=forms.ClearableFileInput(attrs={'multiple': True}),
        required=True
    )

    def clean_images(self):
        images = self.files.getlist('images')
        if len(images) > 5:
            raise forms.ValidationError("You can upload up to 5 images only.")
        if not images:
            raise forms.ValidationError("At least one image is required.")
        return images

    class Meta:
        model = HouseImage
        fields = []  # No need for 'description' here anymore



#ADDING A LANDLORD
class LandlordForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ['name', 'email', 'password', 'repeat_pass']

# EDITTING A LANDLORD
class LandlordEditForm(forms.ModelForm):
    class Meta:
        model = Landlord
        fields = ['email', 'password']