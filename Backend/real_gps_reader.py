import serial
import time
import requests
import pynmea2


SERIAL_PORT = 'COM3'
BAUD_RATE = 9600
API_URL = "http://localhost:8000/api/v1"
USER_ID = "device_001"
JWT_TOKEN = "your_jwt_token_here"

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
                            







                            



                            

                            ai_weather_condition = "Clear"
                            ai_temperature = 25.0
                            ai_event_type = "tracking"
                            ai_severity = 0.0


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
