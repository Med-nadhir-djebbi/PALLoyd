from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class UBIScore(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    calculated_at: datetime = Field(default_factory=datetime.utcnow)
    score: float  # 0 to 100
    safety_level: str # "Safe", "Moderate", "Risky"
    explanation: Optional[str] = None
