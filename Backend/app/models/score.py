from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class UBIScore(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    calculated_at: datetime = Field(default_factory=datetime.utcnow)
    score: float
    safety_level: str
    explanation: Optional[str] = None
