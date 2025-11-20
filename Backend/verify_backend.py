import requests
import time

BASE_URL = "http://localhost:8000"

def test_backend():
    print("Testing Driver Safety Backend...")

    # 1. Check Root
    try:
        response = requests.get(f"{BASE_URL}/")
        assert response.status_code == 200
        print("[Info] Root endpoint is up.")
    except Exception as e:
        print(f"[Error] Failed to connect to backend: {e}")
        return

    # 2. Create Event
    user_id = "user_123"
    event_data = {
        "user_id": user_id,
        "event_type": "harsh_braking",
        "severity": 0.8,
        "latitude": 34.0522,
        "longitude": -118.2437,
        "details": "Sudden stop at intersection"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/events/", json=event_data)
    if response.status_code == 200:
        print("[Info] Event created successfully.")
        print(f"   Response: {response.json()}")
    else:
        print(f"[Error] Failed to create event: {response.text}")

    # 3. Get Score
    response = requests.get(f"{BASE_URL}/api/v1/scores/{user_id}")
    if response.status_code == 200:
        print("[Info] Score retrieved successfully.")
        print(f"   Response: {response.json()}")
    else:
        print(f"[Error] Failed to retrieve score: {response.text}")

if __name__ == "__main__":
    test_backend()
