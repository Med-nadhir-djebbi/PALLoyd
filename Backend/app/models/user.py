from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
import uuid

class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    full_name: str
    phone_number: str = Field(index=True)
    cin: str = Field(index=True, unique=True)
    age: int
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
