from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlmodel import Session, select
from app.db.session import engine
from app.models.telemetry import Trip, TelemetryData
from app.schemas.telemetry import TelemetryInput
from typing import List, Union
import json
from datetime import timedelta

router = APIRouter()

@router.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            try:
                parsed_data = json.loads(data)
            except json.JSONDecodeError:
                await websocket.send_text("Error: Invalid JSON")
                continue


            telemetry_items = []
            if isinstance(parsed_data, list):
                telemetry_items = parsed_data
            elif isinstance(parsed_data, dict):
                telemetry_items = [parsed_data]
            else:
                await websocket.send_text("Error: Expected JSON object or array")
                continue


            valid_items = []
            for item in telemetry_items:
                try:
                    valid_items.append(TelemetryInput(**item))
                except Exception as e:
                    print(f"Validation error: {e}")

                    continue
            
            if not valid_items:
                continue


            valid_items.sort(key=lambda x: x.timestamp)

            with Session(engine) as session:
                for item in valid_items:

                    statement = select(Trip).where(Trip.immat == item.immat).where(Trip.is_active == True).order_by(Trip.end_time.desc())
                    results = session.exec(statement)
                    current_trip = results.first()

                    if current_trip:

                        time_diff = item.timestamp - current_trip.end_time
                        if time_diff > timedelta(minutes=5):

                            current_trip.is_active = False
                            session.add(current_trip)
                            

                            current_trip = Trip(
                                immat=item.immat,
                                start_time=item.timestamp,
                                end_time=item.timestamp,
                                is_active=True
                            )
                            session.add(current_trip)
                            session.commit()
                            session.refresh(current_trip)
                        else:

                            if item.timestamp > current_trip.end_time:
                                current_trip.end_time = item.timestamp
                                session.add(current_trip)
                    else:

                        current_trip = Trip(
                            immat=item.immat,
                            start_time=item.timestamp,
                            end_time=item.timestamp,
                            is_active=True
                        )
                        session.add(current_trip)
                        session.commit()
                        session.refresh(current_trip)


                    telemetry_entry = TelemetryData(
                        trip_id=current_trip.id,
                        immat=item.immat,
                        timestamp=item.timestamp,
                        latitude=item.latitude,
                        longitude=item.longitude,
                        speed=item.speed,
                        acceleration=item.acceleration,
                        steer=item.steer,
                        rpm=item.rpm,
                        engine_load=item.engine_load,
                        coolant_temp=item.coolant_temp,
                        intake_temp=item.intake_temp,
                        mass_air_flow=item.mass_air_flow,
                        throttle_pos=item.throttle_pos,
                        fuel_level=item.fuel_level,
                        battery_voltage=item.battery_voltage,
                        fuel_consumption=item.fuel_consumption,
                        dtc_codes=item.dtc_codes
                    )
                    session.add(telemetry_entry)
                
                session.commit()
            
            await websocket.send_text("Data received and processed")

    except WebSocketDisconnect:
        print("Client disconnected")
