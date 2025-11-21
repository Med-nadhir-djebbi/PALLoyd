from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.event import DrivingEvent
from app.models.score import UBIScore
from app.schemas.score import ScoreRead
from app.services.ml_service import ml_service
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.get("/{user_id}", response_model=ScoreRead)
def get_score(
    user_id: str, 
    session: Session = Depends(get_session),
    current_user: User = Depends(deps.get_current_user)
):
    if user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this score")

    # Fetch events for the user
    statement = select(DrivingEvent).where(DrivingEvent.user_id == user_id)
    events = session.exec(statement).all()
    
    # Calculate features
    harsh_braking = sum(1 for e in events if e.event_type == "Harsh Braking")
    speeding = sum(1 for e in events if e.event_type == "Speeding")
    distraction = sum(1 for e in events if e.event_type == "Distraction")
    
    # Get score from ML model
    current_score = ml_service.predict_score(harsh_braking, speeding, distraction)
    
    # Determine safety level
    if current_score >= 80:
        safety_level = "Safe"
    elif current_score >= 60:
        safety_level = "Moderate"
    elif current_score >= 40:
        safety_level = "Risky"
    else:
        safety_level = "Dangerous"
        
    explanation = f"Score based on {len(events)} events: {harsh_braking} braking, {speeding} speeding, {distraction} distraction."

    new_score = UBIScore(
        user_id=user_id,
        score=round(current_score, 1),
        safety_level=safety_level,
        explanation=explanation
    )
    session.add(new_score)
    session.commit()
    session.refresh(new_score)
    
    return new_score
