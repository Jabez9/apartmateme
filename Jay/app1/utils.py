# utils.py

import os

# def house_image_upload_to(instance, filename):
#     # Create a folder for each house using its name (you can also use instance.house.name or instance.house.id)
#     house_folder = instance.house.name.replace(" ", "_")  # Replace spaces with underscores
#     return os.path.join('houses', house_folder, filename)



# def house_main_image_upload_to(instance, filename):
#     # Create a folder for each house using its name (you can also use instance.house.id)
#     house_folder = instance.house.name.replace(" ", "_")  # Replace spaces with underscores
#     return os.path.join('houses', house_folder, 'main', filename)



def house_image_upload_to(instance, filename):
    # Use instance.name directly as it's already a House object
    house_folder = instance.name.replace(" ", "_")  # Replace spaces with underscores
    return os.path.join('houses', house_folder, filename)


def house_main_image_upload_to(instance, filename):
    # Use instance.name directly
    house_folder = instance.name.replace(" ", "_")  # Replace spaces with underscores
    return os.path.join('houses', house_folder, 'main', filename)
