"""
Auraloom — Database Configuration
SQLite + SQLAlchemy setup for local development.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# ── Database path ────────────────────────────────────────
# In Docker, the database lives at /app/database/canvas.db
# Locally, it lives at ./database/canvas.db
DATABASE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "database")
os.makedirs(DATABASE_DIR, exist_ok=True)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{os.path.join(DATABASE_DIR, 'canvas.db')}"
)

# ── SQLAlchemy Engine ────────────────────────────────────
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Required for SQLite
    echo=False,
)

# ── Session Factory ──────────────────────────────────────
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ── Declarative Base ─────────────────────────────────────
class Base(DeclarativeBase):
    pass


def get_db():
    """
    Dependency that provides a database session.
    Ensures the session is closed after each request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
