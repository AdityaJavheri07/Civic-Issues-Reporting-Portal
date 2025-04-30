import serial
import time
import re
from pymongo import MongoClient
import requests
from datetime import datetime, timedelta

# MongoDB setup (local)
client = MongoClient("mongodb://localhost:27017/")
db = client["civicIssues"]
collection = db["waterQuality"]

# Node.js backend API for complaint
complaint_url = "http://localhost:3000/submitComplaint"

# Serial port setup (update COM port if needed)
ser = serial.Serial('COM5', 9600, timeout=1)
time.sleep(2)  # Wait for Arduino reset

# Thresholds
TDS_THRESHOLD = 500
TURBIDITY_THRESHOLD = 25

tds_value = None
turbidity_value = None

# Track last complaint time
last_complaint_time = None

while True:
    try:
        line = ser.readline().decode('utf-8').strip()
        print(line)

        if "TDS" in line:
            match = re.search(r"TDS: ([\d.]+)", line)
            if match:
                tds_value = float(match.group(1))

        if "Turbidity" in line:
            match = re.search(r"Turbidity: ([\d.]+)", line)
            if match:
                turbidity_value = float(match.group(1))

        if tds_value is not None and turbidity_value is not None:
            now = time.strftime('%Y-%m-%d %H:%M:%S')
            record = {
                "tds": tds_value,
                "turbidity": turbidity_value,
                "timestamp": now
            }
            collection.insert_one(record)
            print("✅ Stored in MongoDB:", record)

            # 🚨 Auto-complaint logic with 1-hour cooldown
            if tds_value > TDS_THRESHOLD or turbidity_value > TURBIDITY_THRESHOLD:
                now_dt = datetime.now()

                if last_complaint_time is None or now_dt - last_complaint_time >= timedelta(hours=1):
                    complaint = {
                        "name": "Contaminated Water",
                        "description": f"Auto-detected issue: TDS = {tds_value} ppm, Turbidity = {turbidity_value}%",
                        "status": "Pending",
                        "createdAt": now_dt.strftime('%Y-%m-%dT%H:%M:%S'),
                        "image": "",  # Leave blank if not using image
                        "location": "Lat: 19.0673, Lon: 72.9892"
                    }
                    try:
                        response = requests.post(complaint_url, json=complaint)
                        if response.status_code == 200:
                            print("🚨 Complaint lodged successfully.")
                            last_complaint_time = now_dt
                        else:
                            print("❌ Failed to lodge complaint:", response.text)
                    except Exception as e:
                        print("❌ Error while lodging complaint:", e)
                else:
                    print("⏳ Complaint not sent — waiting for 1-hour interval.")

            # Reset readings for next cycle
            tds_value = None
            turbidity_value = None

        time.sleep(3)

    except KeyboardInterrupt:
        print("🛑 Stopped by user.")
        ser.close()
        break
