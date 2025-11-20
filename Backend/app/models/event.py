from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class DrivingEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    event_type: str
    severity: float
    latitude: float
    longitude: float
    weather_condition: Optional[str] = "Clear"
    temperature: Optional[float] = 20.0
    details: Optional[str] = None
