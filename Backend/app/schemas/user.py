from pydantic import BaseModel, validator
import re

class UserCreate(BaseModel):
    full_name: str
    phone_number: str
    cin: str
    age: int
    password: str

    @validator('phone_number')
    def validate_tunisian_phone(cls, v):

        v = v.replace(" ", "").replace("-", "")
        

        if not (v.startswith("+216") or v.startswith("216")):
            raise ValueError('Phone number must start with +216')
        

        number_part = v.replace("+216", "").replace("216", "", 1)
        
        if not number_part.isdigit() or len(number_part) != 8:
            raise ValueError('Phone number must contain exactly 8 digits after country code')
            
        return v

    @validator('cin')
    def validate_cin(cls, v):
        if not v.isdigit() or len(v) != 8:
            raise ValueError('CIN must be composed of exactly 8 digits')
        return v

class UserRead(BaseModel):
    id: str
    full_name: str
    phone_number: str
    cin: str
    age: int
