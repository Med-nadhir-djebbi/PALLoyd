from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func
from typing import List, Dict, Any
from app.db.session import get_session
from app.models.user import User
from app.models.score import UBIScore
from app.models.event import DrivingEvent

router = APIRouter()

@router.get("/users", response_model=List[Dict[str, Any]])
def get_all_users(session: Session = Depends(get_session)):
    """
    Get list of all users with their latest score.
    """
    users = session.exec(select(User)).all()
    result = []
    for user in users:
        # Get latest score
        score_stmt = select(UBIScore).where(UBIScore.user_id == user.id).order_by(UBIScore.calculated_at.desc())
        latest_score = session.exec(score_stmt).first()
        
        result.append({
            "id": user.id,
            "full_name": user.full_name,
            "cin": user.cin,
            "phone_number": user.phone_number,
            "score": latest_score.score if latest_score else 0,
            "safety_level": latest_score.safety_level if latest_score else "Unknown",
            "status": "Active", # Mocked
            "category": "Silver" # Mocked
        })
    return result

@router.get("/users/{user_id}", response_model=Dict[str, Any])
def get_user_details(user_id: str, session: Session = Depends(get_session)):
    """
    Get detailed user info including payment and AI comments.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get latest score
    score_stmt = select(UBIScore).where(UBIScore.user_id == user.id).order_by(UBIScore.calculated_at.desc())
    latest_score = session.exec(score_stmt).first()
    
    return {
        "user": user,
        "score": latest_score,
        "payment": {
            "status": "Paid",
            "amount": 120.0,
            "next_due": "2025-12-15",
            "currency": "TND"
        },
        "ai_comments": latest_score.explanation if latest_score else "No driving data available yet."
    }

@router.get("/heatmap", response_model=List[Dict[str, Any]])
def get_heatmap_data(session: Session = Depends(get_session)):
    """
    Get all driving events with location data for heatmap.
    """
    events = session.exec(select(DrivingEvent)).all()
    return [
        {
            "lat": event.latitude,
            "lng": event.longitude,
            "severity": event.severity,
            "type": event.event_type
        }
        for event in events
    ]

@router.get("/stats", response_model=Dict[str, Any])
def get_dashboard_stats(session: Session = Depends(get_session)):
    """
    Get aggregate stats for the dashboard.
    """
    total_users = session.exec(select(func.count(User.id))).one()
    avg_score = session.exec(select(func.avg(UBIScore.score))).one() or 0
    total_events = session.exec(select(func.count(DrivingEvent.id))).one()
    
    return {
        "total_users": total_users,
        "avg_score": round(avg_score, 1),
        "total_events": total_events,
        "active_alerts": 5 # Mocked
    }
