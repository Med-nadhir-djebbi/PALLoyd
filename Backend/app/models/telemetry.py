from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
import uuid

class Trip(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    immat: str = Field(index=True)
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)
    
    telemetry_data: List["TelemetryData"] = Relationship(back_populates="trip")

class TelemetryData(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    trip_id: Optional[int] = Field(default=None, foreign_key="trip.id")
    immat: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    latitude: float
    longitude: float
    speed: float
    acceleration: float
    steer: float
    

    rpm: Optional[float] = None
    engine_load: Optional[float] = None
    coolant_temp: Optional[float] = None
    intake_temp: Optional[float] = None
    mass_air_flow: Optional[float] = None
    throttle_pos: Optional[float] = None
    fuel_level: Optional[float] = None
    battery_voltage: Optional[float] = None
    fuel_consumption: Optional[float] = None
    dtc_codes: Optional[str] = None

    trip: Optional[Trip] = Relationship(back_populates="telemetry_data")
