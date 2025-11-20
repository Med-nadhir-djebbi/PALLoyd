from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.event import DrivingEvent
from app.models.score import UBIScore
from app.schemas.score import ScoreRead

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
        safety_level = "Moderate"
    else:
        safety_level = "Risky"
        
    explanation = f"Score based on {len(events)} events."


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
