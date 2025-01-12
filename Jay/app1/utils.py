import os
def house_main_image_upload_to(instance, filename):
    from .models import House
    # Handle upload for House instances
    if isinstance(instance, House):
        house_folder = instance.name.replace(" ", "_")
        return os.path.join('houses', house_folder, 'main', filename)
    else:
        raise ValueError(f"Expected instance of House, but got {type(instance)}")


def house_image_upload_to(instance, filename):
    from .models import HouseImage
    # Handle upload for HouseImage instances
    if isinstance(instance, HouseImage):
        house = instance.house  # Access the related House object
        house_folder = house.name.replace(" ", "_")  # Use the house name
        return os.path.join('houses', house_folder, 'additional', filename)
    else:
        raise ValueError(f"Expected instance of HouseImage, but got {type(instance)}")

#for this case , theres no need to import the house model to prevent circular import when used in models.py if in another file, the house has to be imported there
def add_images_to_house(house_id, image_files):
    from.models import House, HouseImage
    house = House.objects.get(pk=house_id)
    for image in image_files:
        HouseImage.objects.create(house=house, image=image)

