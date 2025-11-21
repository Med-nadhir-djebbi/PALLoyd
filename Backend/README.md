# Driver Safety Backend

Backend API for the Driver Safety System with ML-powered scoring.

## Features

- **User Management**: Registration and JWT authentication
- **Event Tracking**: Store driving events (harsh braking, speeding, distraction)
- **ML Scoring**: TensorFlow model calculates safety scores
- **Real-time Monitoring**: WebSocket support for live updates
- **PostgreSQL Database**: Persistent storage

## Setup

### 1. Start Database

```bash
wsl docker-compose up -d
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Initialize Database

```bash
python init_test_db.py
```

### 4. Run Server

```bash
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`

## Verification

Run the comprehensive test suite:

```bash
python verify_system.py
```

This tests:
- ✓ Backend API connectivity
- ✓ User registration
- ✓ JWT authentication
- ✓ Event posting
- ✓ ML model scoring
- ✓ Database integration

## API Endpoints

### Authentication
- `POST /api/v1/users/` - Register new user
- `POST /api/v1/login/access-token` - Login and get JWT token

### Events
- `POST /api/v1/events/` - Post driving event

### Scoring
- `GET /api/v1/scores/{user_id}` - Get ML-calculated safety score

## ML Model

The TensorFlow model calculates safety scores based on:
- **Harsh Braking** events (-5 points each)
- **Speeding** events (-5 points each)
- **Distraction** events (-5 points each)

Base score: 100 points

**Safety Levels:**
- Safe: ≥80
- Moderate: 60-79
- Risky: 40-59
- Dangerous: <40

## Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/Palloyd
SECRET_KEY=your-secret-key-here
```

## Project Structure

```
Backend/
├── app/
│   ├── api/v1/endpoints/  # API routes
│   ├── core/              # Config & security
│   ├── db/                # Database session
│   ├── models/            # SQLModel models
│   ├── schemas/           # Pydantic schemas
│   └── services/          # Business logic (ML, SMS, etc.)
├── verify_system.py       # Comprehensive test suite
├── init_test_db.py        # Database initialization
└── requirements.txt       # Python dependencies
```
