import sys
import os
from sqlmodel import SQLModel

# Add backend to path
sys.path.append(os.getcwd())

from app.db.session import engine, init_db
# Import models to ensure they are registered
from app.models.user import User
from app.models.event import DrivingEvent
from app.models.score import UBIScore

def main():
    print("Initializing test database...")
    print(f"Database URL: {engine.url}")
    try:
        init_db()
        print("Database initialized successfully.")
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    main()
