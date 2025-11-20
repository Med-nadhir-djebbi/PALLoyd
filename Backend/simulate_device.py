import requests
import time
import random

# Configuration
BACKEND_URL = "http://localhost:8000/api/v1"

# Real Route: Driving down Champs-Élysées, Paris
START_LAT = 48.8738
START_LONG = 2.2950
END_LAT = 48.8656
END_LONG = 2.3212

def register_user():
    print("\n📱 --- FRONTEND SIMULATION: User Registration ---")
    print("Please enter your details as if you were on the mobile app.")
    
    full_name = input("Enter Full Name: ")
    phone_number = input("Enter Phone Number (+216...): ")
    cin = input("Enter CIN (8 digits): ")
    age = int(input("Enter Age: "))
    password = input("Enter Password: ")

    user_data = {
        "full_name": full_name,
        "phone_number": phone_number,
        "cin": cin,
        "age": age,
        "password": password
    }
    
    token = None
    user_id = None

    try:
        # 1. Register
        response = requests.post(f"{BACKEND_URL}/users/", json=user_data)
        if response.status_code == 200:
            user = response.json()
            user_id = user['id']
            print(f"[Info] Registered! User ID: {user_id}")
        elif response.status_code == 400 and "already exists" in response.text:
             print("[Info] User already exists. Trying to login...")
        else:
            print(f"[Error] Registration failed: {response.text}")
            return None, None

        # 2. Login to get Token
        print("🔑 Logging in...")
        login_data = {
            "username": phone_number,
            "password": password
        }
        login_response = requests.post(f"{BACKEND_URL}/login/access-token", data=login_data)
        
        if login_response.status_code == 200:
            token_data = login_response.json()
            token = token_data["access_token"]
            print("[Info] Login Successful! Token received.")
            
            # If we didn't get user_id from registration (because user existed), we need to fetch it or assume it
            # For this simulation, let's assume we registered successfully or we can't proceed easily without an endpoint to get 'me'
            # But wait, the registration response gave us the ID. If we skipped reg, we don't have ID.
            # Let's just fail if registration failed for now to keep it simple, or ask user to re-register with new CIN.
            if not user_id:
                 print("[Error] Cannot proceed without User ID (Simulation limitation). Please use a new CIN/Phone.")
                 return None, None
                 
            return user_id, token
        else:
            print(f"[Error] Login Failed: {login_response.text}")
            return None, None

    except Exception as e:
        print(f"[Error] Connection Error: {e}")
        return None, None


def get_route_points(steps=20):
    route = []
    lat_step = (END_LAT - START_LAT) / steps
    long_step = (END_LONG - START_LONG) / steps
    for i in range(steps + 1):
        lat = START_LAT + (lat_step * i)
        long = START_LONG + (long_step * i)
        route.append((lat, long))
    return route

def simulate_driving_session():
    # 1. Register & Login
    user_id, token = register_user()
    if not user_id or not token:
        return

    headers = {"Authorization": f"Bearer {token}"}

    print(f"🚗 Starting driving simulation for user: {user_id}")
    print("📍 Route: Champs-Élysées, Paris")
    print("Press Ctrl+C to stop.")
    
    route_points = get_route_points(steps=30)
    
    # Expanded Event Types
    event_types = [
        "speeding", "harsh_braking", "harsh_acceleration", 
        "harsh_cornering", "phone_usage", "safe_driving"
    ]
    
    # Random Weather for this session
    weather_options = ["Clear", "Rain", "Snow", "Fog"]
    current_weather = random.choice(weather_options)
    current_temp = round(random.uniform(-5, 35), 1) # -5 to 35 Celsius
    
    print(f"[Weather] Condition: {current_weather} | Temp: {current_temp} C")
    if current_weather != "Clear":
        print("[Info] Bad weather detected! Drive carefully (Penalties are higher).")

    try:
        for lat, long in route_points:
            if random.random() < 0.4: # Increased event chance
                event_type = random.choice(event_types)
                if event_type != "safe_driving":
                    severity = round(random.uniform(0.3, 0.9), 2)
                    print(f"[AI DETECTED] {event_type.upper()} | Severity: {severity}")
                    
                    payload = {
                        "user_id": user_id,
                        "event_type": event_type,
                        "severity": severity,
                        "latitude": lat,
                        "longitude": long,
                        "weather_condition": current_weather,
                        "temperature": current_temp,
                        "details": "Simulated AI detection"
                    }
                    try:
                        requests.post(f"{BACKEND_URL}/events/", json=payload, headers=headers)
                    except:
                        pass
            else:
                print(f"Driving... 📍 {lat:.6f}, {long:.6f}")
                # Send heartbeat (tracking)
                payload = {
                        "user_id": user_id,
                        "event_type": "tracking",
                        "severity": 0.0,
                        "latitude": lat,
                        "longitude": long,
                        "weather_condition": current_weather,
                        "temperature": current_temp,
                        "details": "Heartbeat"
                }
                try:
                    requests.post(f"{BACKEND_URL}/events/", json=payload, headers=headers)
                except:
                    pass

            time.sleep(1)
            
        print("\n🏁 Reached destination.")
        
        # Get final score
        print("📊 Fetching final UBI Score...")
        try:
            response = requests.get(f"{BACKEND_URL}/scores/{user_id}", headers=headers)
            if response.status_code == 200:
                data = response.json()
                print(f"Score: {data['score']} | Level: {data['safety_level']}")
            else:
                 print(f"[Error] Failed to get score: {response.status_code}")
        except:
            pass

    except KeyboardInterrupt:
        print("\n[System] User requested shutdown (Ctrl+C detected).")
        print("[Alert] Sending 'shutdown_attempt' alert to backend...")
        
        payload = {
            "user_id": user_id,
            "event_type": "shutdown_attempt",
            "severity": 1.0,
            "latitude": 0.0, # Last known or 0
            "longitude": 0.0,
            "details": "User tried to close the app"
        }
        try:
            requests.post(f"{BACKEND_URL}/events/", json=payload, headers=headers)
            print("[Info] Alert sent! Check your SMS.")
        except:
            print("[Error] Failed to send alert.")
            
        print("[System] Simulation stopped.")

if __name__ == "__main__":
    simulate_driving_session()
