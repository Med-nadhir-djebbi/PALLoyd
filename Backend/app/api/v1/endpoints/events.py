from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.session import get_session
from app.models.event import DrivingEvent
from app.schemas.event import EventCreate, EventRead

from app.api import deps
from app.models.user import User
from app.services.sms import send_sms

router = APIRouter()

@router.post("/", response_model=EventRead)
def create_event(
    event: EventCreate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(deps.get_current_user)
):
    # Verify the user_id matches the token owner
    if event.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to send events for this user")
    
    # Check for Shutdown Attempt
    if event.event_type == "shutdown_attempt":
        print(f"[Alert] IMMEDIATE ALERT: User {current_user.full_name} is trying to shut down!")
        msg = (
            "WARNING: You are attempting to disable the safety device! "
            "Keep the app running to avoid a fine (amende)."
        )
        send_sms(current_user.phone_number, msg)

    db_event = DrivingEvent.from_orm(event)
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event
