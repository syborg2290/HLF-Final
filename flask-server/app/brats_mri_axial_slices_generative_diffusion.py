import torch
import monai
from monai.apps import download_and_extract
from monai.config import print_config
from monai.transforms import Compose, LoadImage, AddChannel, ScaleIntensity, ToTensor, Resize
from monai.inferers import SimpleInferer
from monai.networks.nets import DenseNet121
from PIL import Image
from flask import Flask, request, jsonify

model_dir = download_and_extract(
    url="https://github.com/monai/monai/raw/main/examples/notebooks/generative/brats_mri_axial_slices_generative_diffusion/best_netG.pth",
    filepath="./model_zoo/best_netG.pth",
    unzip=False
)

model = torch.load(model_dir)
model = model.eval()


def generate_image(noise):

    # Generate the image
    with torch.no_grad():
        generated_image = model(noise)
    
    # Convert the generated image tensor to a PIL image
    generated_image = monai.utils.unpad(generated_image, (240, 240))
    generated_image = generated_image.detach().cpu().squeeze().numpy()
    generated_image = Image.fromarray(generated_image)

    # Return the generated image
    return generated_image

