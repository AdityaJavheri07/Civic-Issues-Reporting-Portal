import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load trained model
model = load_model("pothole_detector.h5")

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    if prediction[0][0] > 0.5:
        print("Pothole detected")
    else:
        print("No pothole detected")

if __name__ == "__main__":
    image_path = sys.argv[1]  # Get image path from command-line argument
    predict_image(image_path)
