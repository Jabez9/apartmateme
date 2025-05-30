from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from app1.models import HouseImage, Landlord

# FORM FOR MULTIPLE HOUSE IMAGES
class HouseImageForm(forms.ModelForm):
    images = forms.ImageField(
        widget=forms.ClearableFileInput(attrs={'multiple': True}),
        required=True
    )

    def clean_images(self):
        images = self.files.getlist('images')
        if not images:
            raise forms.ValidationError("At least one image is required.")
        if len(images) > 5:
            raise forms.ValidationError("You can upload up to 5 images only.")
        return images

    class Meta:
        model = HouseImage
        fields = []


# ADD LANDLORD (extends AbstractUser)
class LandlordForm(UserCreationForm):
    class Meta:
        model = Landlord
        fields = ['name', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.name = self.cleaned_data['name']
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user


# EDIT LANDLORD PROFILE
class LandlordEditForm(UserChangeForm):
    password = None  # hide password

    class Meta:
        model = Landlord
        fields = ['name', 'email']