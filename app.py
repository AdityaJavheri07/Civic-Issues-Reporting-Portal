from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import cv2
import base64
import os

app = Flask(__name__)
CORS(app)

# Load trained models
model = load_model("pothole_detector.h5")
water_logging_model = load_model("water_logging_model.h5")  # New model

def detect_blurriness(image_path):
    img = cv2.imread(image_path)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray_img, cv2.CV_64F)
    variance = laplacian.var()
    return variance

def predict_image(image_path):
    img = image.load_img(image_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = model.predict(img_array)
    return prediction[0][0] > 0.5

# New: Prediction function for water logging
def predict_water_logging(image_path):
    img = image.load_img(image_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = water_logging_model.predict(img_array)
    return prediction[0][0] > 0.5

@app.route('/verifyPothole', methods=['POST'])
def verify_pothole():
    try:
        data = request.get_json()
        image_data = data['image']
        email = data['email']
        # Decode base64 image
        image_data = base64.b64decode(image_data.split(',')[1])
        image_path = 'uploads/pothole_test.jpg'
        with open(image_path, 'wb') as f:
            f.write(image_data)
        # Detect blurriness
        variance = detect_blurriness(image_path)
        if variance < 100:
            return jsonify(success=False, message='The uploaded image is blurred. Please upload a clear image.')
        # Predict pothole
        is_pothole = bool(predict_image(image_path))  # Convert to standard Python boolean
        return jsonify(success=True, isPothole=is_pothole)
    except Exception as e:
        app.logger.error(f"Error processing image: {e}")
        return jsonify(success=False, message='Failed to process image')


# New: Route for verifying water logging

app.route('/verifyWaterLogging', methods=['POST'])
@app.route('/verifyWaterLogging', methods=['POST'])
def verify_water_logging():
    try:
        data = request.get_json()
        image_data = data['image']
        email = data['email']
        # Decode base64 image
        image_data = base64.b64decode(image_data.split(',')[1])
        image_path = 'uploads/water_logging_test.jpg'
        with open(image_path, 'wb') as f:
            f.write(image_data)
        # Detect blurriness
        variance = detect_blurriness(image_path)
        if variance < 100:
            return jsonify(success=False, message='The uploaded image is blurred. Please upload a clear image.')
        # Predict water logging
        is_water_logged = bool(predict_water_logging(image_path))  # Convert to standard Python boolean
        return jsonify(success=True, isWaterLogged=is_water_logged)
    except Exception as e:
        app.logger.error(f"Error processing image: {e}")
        return jsonify(success=False, message='Failed to process image')


if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(host='0.0.0.0', port=5000)
