from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class DrivingEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True) # The driver's unique ID
    timestamp: datetime = Field(default_factory=datetime.utcnow) # When the event happened
    event_type: str  # e.g., "speeding", "harsh_braking", "distraction"
    severity: float  # 0.0 (mild) to 1.0 (severe)
    latitude: float  # GPS Latitude
    longitude: float # GPS Longitude
    weather_condition: Optional[str] = "Clear" # e.g., "Rain", "Snow", "Fog"
    temperature: Optional[float] = 20.0 # Celsius
    details: Optional[str] = None
