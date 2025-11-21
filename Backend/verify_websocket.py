from fastapi.testclient import TestClient
from app.main import app
from datetime import datetime, timedelta
import json
import time

client = TestClient(app)

def test_websocket_telemetry():
    print("Starting WebSocket Telemetry Verification...")
    
    with client.websocket_connect("/ws/telemetry") as websocket:

        now = datetime.utcnow()
        data_point_1 = {
            "immat": "123TUN4567",
            "timestamp": now.isoformat(),
            "latitude": 36.8065,
            "longitude": 10.1815,
            "speed": 50.0,
            "acceleration": 0.5,
            "steer": 0.0,
            "rpm": 2500.0,
            "fuel_level": 75.0
        }
        websocket.send_text(json.dumps(data_point_1))
        response = websocket.receive_text()
        print(f"Response 1: {response}")
        assert response == "Data received and processed"


        data_point_2 = data_point_1.copy()
        data_point_2["timestamp"] = (now + timedelta(minutes=1)).isoformat()
        data_point_2["speed"] = 55.0
        websocket.send_text(json.dumps(data_point_2))
        response = websocket.receive_text()
        print(f"Response 2: {response}")
        assert response == "Data received and processed"




        point_3_time = now + timedelta(minutes=2)
        point_4_time = now + timedelta(minutes=10)
        
        batch_data = [
            {
                "immat": "123TUN4567",
                "timestamp": point_3_time.isoformat(),
                "latitude": 36.8100,
                "longitude": 10.1850,
                "speed": 60.0,
                "acceleration": 0.0,
                "steer": 5.0
            },
            {
                "immat": "123TUN4567",
                "timestamp": point_4_time.isoformat(),
                "latitude": 36.8200,
                "longitude": 10.1900,
                "speed": 0.0,
                "acceleration": 0.0,
                "steer": 0.0
            }
        ]
        websocket.send_text(json.dumps(batch_data))
        response = websocket.receive_text()
        print(f"Response 3 (Batch): {response}")
        assert response == "Data received and processed"

    print("\nVerification Successful! Data sent via WebSocket.")
    print("Check the database to confirm Trip splitting.")

if __name__ == "__main__":

    from app.db.session import init_db
    init_db()
    test_websocket_telemetry()
