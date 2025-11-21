from fastapi import FastAPI
from app.core.config import settings
from app.db.session import init_db
from app.api.v1.endpoints import events, scores, users, login, telemetry

from app.api.v1.endpoints import events, scores, users, login
from app.services.watchdog import start_watchdog

app = FastAPI(title=settings.PROJECT_NAME)

@app.on_event("startup")
def on_startup():
    init_db()
    start_watchdog()

app.include_router(events.router, prefix="/api/v1/events", tags=["events"])
app.include_router(scores.router, prefix="/api/v1/scores", tags=["scores"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(login.router, prefix="/api/v1", tags=["login"])
app.include_router(telemetry.router, tags=["telemetry"])

@app.get("/")
def root():
    return {"message": "Driver Safety Backend API is running"}
