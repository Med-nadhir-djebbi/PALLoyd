import requests
import sys

BASE_URL = "http://localhost:8000/api/v1/admin"

def test_admin_endpoints():
    print("Testing Admin Endpoints...")
    
    # 1. Stats
    try:
        response = requests.get(f"{BASE_URL}/stats")
        if response.status_code == 200:
            print("✅ GET /stats: Success")
            print(response.json())
        else:
            print(f"❌ GET /stats: Failed ({response.status_code})")
            print(response.text)
    except Exception as e:
        print(f"❌ GET /stats: Error ({e})")

    # 2. Users
    try:
        response = requests.get(f"{BASE_URL}/users")
        if response.status_code == 200:
            print("✅ GET /users: Success")
            users = response.json()
            print(f"Found {len(users)} users")
            
            if users:
                user_id = users[0]['id']
                # 3. User Details
                print(f"Testing details for user {user_id}...")
                resp_detail = requests.get(f"{BASE_URL}/users/{user_id}")
                if resp_detail.status_code == 200:
                    print("✅ GET /users/{id}: Success")
                    print(resp_detail.json())
                else:
                    print(f"❌ GET /users/{id}: Failed ({resp_detail.status_code})")
        else:
            print(f"❌ GET /users: Failed ({response.status_code})")
    except Exception as e:
        print(f"❌ GET /users: Error ({e})")

    # 4. Heatmap
    try:
        response = requests.get(f"{BASE_URL}/heatmap")
        if response.status_code == 200:
            print("✅ GET /heatmap: Success")
            print(f"Found {len(response.json())} events")
        else:
            print(f"❌ GET /heatmap: Failed ({response.status_code})")
    except Exception as e:
        print(f"❌ GET /heatmap: Error ({e})")

if __name__ == "__main__":
    test_admin_endpoints()
