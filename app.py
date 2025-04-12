from flask import Flask, request, jsonify, render_template_string
from pymongo import MongoClient
from datetime import datetime
import serial
import json
from threading import Thread

# MongoDB Atlas URI
MONGO_URI = "mongodb+srv://samuelrod2476:root@cluster0.unblgut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['water_quality']
collection = db['readings']

# Flask app
app = Flask(__name__)

# Global variable to store latest sensor reading
sensor_data = {"tds": None, "turbidity": None}

# Background thread to read from Arduino
def read_serial():
    global sensor_data
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
        while True:
            try:
                line = ser.readline().decode().strip()
                if line:
                    data = json.loads(line)
                    sensor_data.update(data)
            except Exception as e:
                print("Serial JSON error:", e)
    except Exception as e:
        print("Could not connect to Arduino:", e)

# Start serial reading in the background
Thread(target=read_serial, daemon=True).start()

# Webpage to get location and upload
HTML_PAGE = '''
<!DOCTYPE html>
<html>
<head><title>Water Logger - your_email</title></head>
<body>
    <h2>Tap to Send Water Sensor + GPS Data</h2>
    <button onclick="getLocation()">Send Data</button>

    <script>
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(sendData, showError, {
                    enableHighAccuracy: true
                });
            } else {
                alert("Geolocation not supported by this device.");
            }
        }

        function sendData(position) {
            const payload = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };

            fetch("/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                alert("Data uploaded:\\n" + JSON.stringify(data.data, null, 2));
            })
            .catch(err => alert("Error uploading data: " + err));
        }

        function showError(error) {
            alert("Location error: " + error.message);
        }
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_PAGE)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    record = {
        "timestamp": datetime.utcnow(),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "accuracy": data.get("accuracy"),
        "tds": sensor_data.get("tds"),
        "turbidity": sensor_data.get("turbidity")
    }
    collection.insert_one(record)
    return jsonify({"status": "success", "data": record})

if __name__ == '__main__':
    print("Visit http://<your-RPi-IP>:5000 on your phone browser")
    app.run(host='0.0.0.0', port=5000)
