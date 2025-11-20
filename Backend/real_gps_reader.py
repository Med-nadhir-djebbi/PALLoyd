import serial
import time
import requests
import pynmea2

# Configuration
SERIAL_PORT = 'COM3' # Change this to your GPS port (e.g., /dev/ttyUSB0)
BAUD_RATE = 9600
API_URL = "http://localhost:8000/api/v1"
USER_ID = "device_001"
JWT_TOKEN = "your_jwt_token_here" # Replace with your actual JWT token

def read_gps_from_hardware():
    print(f"[GPS] Connecting to GPS Module on {SERIAL_PORT}...")
    
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
            print("[GPS] Connected! Waiting for satellite fix...")
            
            while True:
                try:
                    line = ser.readline().decode('ascii', errors='replace').strip()
                    
                    if line.startswith("$GPGGA"):
                        msg = pynmea2.parse(line)
                        if msg.latitude and msg.longitude:
                            lat = msg.latitude
                            long = msg.longitude
                            
                            print(f"[GPS] Location: {lat}, {long}")
                            
                            # ---------------------------------------------------------
                            # TODO: INTEGRATE YOUR FRIEND'S AI MODEL HERE
                            # ---------------------------------------------------------
                            # The AI model should provide:
                            # 1. Real Weather (Rain, Snow, etc.)
                            # 2. Real Events (Potholes, Stop Signs, etc.)
                            # ---------------------------------------------------------
                            
                            # Example:
                            # ai_weather_condition = my_ai_model.get_weather()
                            # ai_event_type = my_ai_model.detect_event()
                            
                            # Placeholder variables for the AI Model
                            ai_weather_condition = "Clear" # Replace with AI output
                            ai_temperature = 25.0          # Replace with AI output
                            ai_event_type = "tracking"     # Replace with AI output
                            ai_severity = 0.0              # Replace with AI output (0.0 to 1.0)

                            # Send Data to Backend
                            payload = {
                                "user_id": USER_ID,
                                "event_type": ai_event_type,
                                "severity": ai_severity,
                                "latitude": lat,
                                "longitude": long,
                                "weather_condition": ai_weather_condition,
                                "temperature": ai_temperature,
                                "details": "Real GPS Data"
                            }
                            
                            try:
                                headers = {"Authorization": f"Bearer {JWT_TOKEN}"}
                                response = requests.post(f"{API_URL}/events/", json=payload, headers=headers)
                                if response.status_code == 200:
                                    print("[API] Data Sent Successfully")
                                else:
                                    print(f"[API] Error: {response.text}")
                            except Exception as e:
                                print(f"[API] Connection Failed: {e}")
                except Exception as e:
                    print(f"[GPS] Read Error: {e}")
                        
    except serial.SerialException as e:
        print(f"[Error] Could not open serial port {SERIAL_PORT}.")
        print("   Make sure your GPS USB dongle is plugged in.")

if __name__ == "__main__":
    read_gps_from_hardware()
