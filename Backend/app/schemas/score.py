from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ScoreRead(BaseModel):
    user_id: str
    score: float
    safety_level: str
    explanation: Optional[str] = None
    calculated_at: datetime
