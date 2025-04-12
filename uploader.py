import serial
import time
from pymongo import MongoClient
import geocoder

# Replace with your MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://samuelrod2476:root@cluster0.unblgut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Initialize MongoDB
client = MongoClient(MONGO_URI)
db = client["water_quality"]
collection = db["readings"]

# Setup Serial connection (change port if needed)
ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
time.sleep(2)  # Wait for Arduino

def get_location():
    g = geocoder.ip("me")
    return {"lat": g.latlng[0], "lon": g.latlng[1]} if g.latlng else {"lat": None, "lon": None}

def read_sensor_data():
    data = {}
    while True:
        line = ser.readline().decode().strip()
        if "TDS" in line:
            data["TDS"] = line
        elif "Turbidity" in line:
            data["Turbidity"] = line
        if len(data) == 2:
            break
    return data

def upload_data():
    sensor_data = read_sensor_data()
    sensor_data["timestamp"] = time.strftime("%Y-%m-%d %H:%M:%S")
    sensor_data["location"] = get_location()
    collection.insert_one(sensor_data)
    print("✅ Uploaded to MongoDB:", sensor_data)

if __name__ == "__main__":
    upload_data()