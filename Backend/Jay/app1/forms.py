
from django import forms
from app1.models import House

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

class HouseForm(forms.ModelForm):
    type = forms.MultipleChoiceField(
        choices=House.TYPE_CHOICES,
        required=True,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'scrollable-checkbox'}),
        label="Type (Select at least one)"
    )

    rent = forms.MultipleChoiceField(
        choices=House.RENT_CHOICES,
        required=True,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'scrollable-checkbox'}),
        label="Rent (Select at least one)"
    )

    class Meta:
        model = House
        exclude = ['landlord', 'dateadded']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Premises Name'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
            'coordinates': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Coordinates'}),
            'main_image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'agent_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Agent Name'}),
            'agent_phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Agent Phone Number'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'pros': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

    def __init__(self, *args, **kwargs):
        self.landlord = kwargs.pop('landlord', None)
        super().__init__(*args, **kwargs)

        if not self.landlord:
            raise ValueError("Landlord must be passed to the form.")

        # Mark all fields as required except for 'coordinates'
        for field_name in self.fields:
            self.fields[field_name].required = field_name != 'coordinates'

    def save(self, commit=True):
        house = super().save(commit=False)
        house.landlord = self.landlord  # ✅ Assign landlord
        if commit:
            house.save()
        return house
