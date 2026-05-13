"""
Auraloom — FastAPI Application Entry Point
Main app with CORS, lifespan events, and router mounting.

Brand: Auraloom — Weaving Emotions into Art
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, SessionLocal, Base
from app.models import Product, CartItem  # noqa: F401 — needed for table creation
from app.seed import seed_database
from app.routers import products, cart


# ── Lifespan: startup/shutdown events ────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    On startup: create database tables and seed sample data.
    On shutdown: nothing special needed for SQLite.
    """
    print("[*] Auraloom -- Starting up...")

    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("  [OK] Database tables created.")

    # Seed with sample products
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

    print("  [OK] Ready to serve.\n")
    yield  # App is running
    print("\n[*] Auraloom -- Shutting down...")


# ── FastAPI App ──────────────────────────────────────────
app = FastAPI(
    title="Auraloom API",
    description="Weaving Emotions into Art — E-commerce backend for handmade products",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS Middleware ──────────────────────────────────────
# Allow the React frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Docker frontend
        "http://localhost:5173",   # Vite dev server
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Mount Routers ────────────────────────────────────────
app.include_router(products.router)
app.include_router(cart.router)


# ── Health Check ─────────────────────────────────────────
@app.get("/api/health", tags=["Health"])
def health_check():
    """Simple health check endpoint."""
    return {"status": "ok", "brand": "Auraloom", "tagline": "Weaving Emotions into Art"}
