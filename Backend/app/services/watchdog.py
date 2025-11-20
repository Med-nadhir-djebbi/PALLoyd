import time
import threading
from datetime import datetime
from sqlmodel import Session, select
from app.db.session import engine
from app.models.event import DrivingEvent
from app.models.user import User
from app.services.sms import send_sms

# Configuration
CHECK_INTERVAL = 10  # Check every 10 seconds
OFFLINE_THRESHOLD_SECONDS = 30 # If no GPS for 30s, consider offline

def _watchdog_loop():
    print("[Watchdog] Service Started (Background Thread)")
    warned_users = set()

    while True:
        try:
            with Session(engine) as session:
                # 1. Get all users
                users = session.exec(select(User)).all()
                
                for user in users:
                    user_id = user.id
                    phone_number = user.phone_number
                    
                    # 2. Get the timestamp of the LAST event for this user
                    statement = select(DrivingEvent).where(DrivingEvent.user_id == user_id).order_by(DrivingEvent.timestamp.desc()).limit(1)
                    last_event = session.exec(statement).first()
                    
                    if last_event:
                        # Calculate how long ago it was
                        time_since_last = datetime.utcnow() - last_event.timestamp
                        seconds_silent = time_since_last.total_seconds()
                        
                        if seconds_silent > OFFLINE_THRESHOLD_SECONDS:
                            if user_id not in warned_users:
                                # TRIGGER ALERT
                                msg = (
                                    "ALERT: GPS Signal Lost! "
                                    "You have 5 minutes to turn your device back ON, "
                                    "otherwise you will receive a fine (une amende)."
                                )
                                send_sms(phone_number, msg)
                                warned_users.add(user_id)
                                print(f"[Watchdog] VIOLATION: {user.full_name} is offline for {int(seconds_silent)}s")
                        else:
                            # User is online
                            if user_id in warned_users:
                                print(f"[Watchdog] {user.full_name} is back online.")
                                warned_users.remove(user_id)
        except Exception as e:
            print(f"[Watchdog] Error: {e}")
            
        time.sleep(CHECK_INTERVAL)

def start_watchdog():
    """Starts the watchdog in a background thread."""
    thread = threading.Thread(target=_watchdog_loop, daemon=True)
    thread.start()
