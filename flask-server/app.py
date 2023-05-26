from flask import Flask, request, jsonify
from flask_cors import CORS

# from app import brats_mri_axial_slices_generative_diffusion
from app import liver_tumor_seg
import torchvision.transforms as transforms
import torchxrayvision as xrv
import skimage, torch, torchvision
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load the X-ray image classification model
classification_model = xrv.models.DenseNet(weights="densenet121-res224-all")
classification_model.eval()
classification_transform = transforms.Compose(
    [
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.Grayscale(num_output_channels=1),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[
                0.485
            ],  # Replace with the appropriate mean value for grayscale images
            std=[
                0.229
            ],  # Replace with the appropriate standard deviation value for grayscale images
        ),
    ]
)

xray_processing_transform = transforms.Compose(
    [xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)]
)


@app.route("/")
def hello():
    return "Hello, World!"


# @app.route("/generate/brats_mri_axial_slices_generative_diffusion", methods=["POST"])
# def brats_mri_axial_slices_generative_diffusion():
#     # Get the input noise from the request
#     noise = request.json["noise"]
#     generated_image = brats_mri_axial_slices_generative_diffusion.generate_image(noise)
#     return generated_image


@app.route("/generate/xray-process", methods=["POST"])
def xray_process():
    # Check if an image file is included in the request
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"})

    # Get the image file from the request
    image_file = request.files["image"]
    try:
        # Load the image
        image = Image.open(image_file)

        # Check if the image is an X-ray using the classification model
        image_tensor = classification_transform(image)
        image_tensor = image_tensor.unsqueeze(0)
        with torch.no_grad():
            output = classification_model(image_tensor)
            probabilities = torch.nn.functional.softmax(output, dim=1)[0]

        xray_label_idx1 = 8
        xray_label_idx2 = 13
        xray_label_idx3 = 11

        xray_threshold1 = 0.0548  # Adjust this threshold based on your preference
        xray_threshold2 = 0.0433
        xray_threshold3 = 0.0534

        # Tolerance for comparison
        tolerance = 1e-6

        print(probabilities)

        if round(probabilities[xray_label_idx1].item(), 4) > round(
            torch.tensor([xray_threshold1]).item(), 4
        ):
            print(round(probabilities[xray_label_idx1].item(), 4))
            print(round(torch.tensor([xray_threshold1]).item(), 4))
            return jsonify({"error": "None X-Ray or Invalid X-Ray"})

        if round(probabilities[xray_label_idx2].item(), 4) > round(
            torch.tensor([xray_threshold2]).item(), 4
        ):
            print(round(probabilities[xray_label_idx2].item(), 4))
            print(round(torch.tensor([xray_threshold2]).item(), 4))
            return jsonify({"error": "None X-Ray or Invalid X-Ray"})

        if round(probabilities[xray_label_idx3].item(), 4) < round(
            torch.tensor([xray_threshold3]).item(), 4
        ):
            print(round(probabilities[xray_label_idx3].item(), 4))
            print(round(torch.tensor([xray_threshold3]).item(), 4))
            return jsonify({"error": "None X-Ray or Invalid X-Ray"})

        # Read and process the image
        img = skimage.io.imread(image_file)
        img = xrv.datasets.normalize(
            img, 255
        )  # convert 8-bit image to [-1024, 1024] range

        # Check if the image has three dimensions
        if len(img.shape) != 3:
            return jsonify(
                {"error": "Invalid image dimensions. Expected a 3-dimensional image."}
            )

        img = img.mean(axis=2)[None, ...]  # Make single color channel

        transform = torchvision.transforms.Compose(
            [xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)]
        )

        img = transform(img)
        img = torch.from_numpy(img)

        # Load model and process image
        model = xrv.models.DenseNet(weights="densenet121-res224-all")
        outputs = model(img[None, ...])  # or model.features(img[None, ...])

        # Convert float32 outputs to serializable format (Python floats)
        serialized_outputs = [float(output) for output in outputs[0].detach().numpy()]

        # Create a dictionary mapping pathologies to serialized outputs
        result = dict(zip(model.pathologies, serialized_outputs))

        # Return the JSON response
        return jsonify(result)

    except RuntimeError as error:
        return jsonify({"error": str(error)})


if __name__ == "__main__":
    app.run()
