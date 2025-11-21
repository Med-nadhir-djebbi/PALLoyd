from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserRead

from app.core.security import get_password_hash

router = APIRouter()

@router.post("/", response_model=UserRead)
def register_user(user: UserCreate, session: Session = Depends(get_session)):

    statement = select(User).where(User.cin == user.cin)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this CIN already exists")


    db_user = User.from_orm(user)
    db_user.hashed_password = get_password_hash(user.password)
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
