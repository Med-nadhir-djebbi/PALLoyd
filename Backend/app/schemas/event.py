from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventCreate(BaseModel):
    user_id: str
    event_type: str
    severity: float
    latitude: float
    longitude: float
    weather_condition: Optional[str]
    temperature: Optional[float]
    details: Optional[str] = None

class EventRead(EventCreate):
    id: int
    timestamp: datetime
