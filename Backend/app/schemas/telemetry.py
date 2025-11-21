from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TelemetryInput(BaseModel):
    immat: str
    timestamp: datetime
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

class TelemetryBatchInput(BaseModel):
    data: List[TelemetryInput]
