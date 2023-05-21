from flask import Flask,request,jsonify
from flask_cors import CORS
# from app import brats_mri_axial_slices_generative_diffusion
from app import liver_tumor_seg
import torchxrayvision as xrv
import skimage, torch, torchvision

app = Flask(__name__)
CORS(app)


@app.route('/')
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

    # Read and process the image
    img = skimage.io.imread(image_file)
    img = xrv.datasets.normalize(img, 255)  # convert 8-bit image to [-1024, 1024] range
    
    # Check if the image has three dimensions
    if len(img.shape) != 3:
        return jsonify({"error": "Invalid image dimensions. Expected a 3-dimensional image."})
    
    img = img.mean(axis=2)[None, ...]  # Make single color channel

    transform = torchvision.transforms.Compose([xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)])

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

if __name__ == '__main__':
    app.run()
