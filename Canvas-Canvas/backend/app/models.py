"""
Auraloom — SQLAlchemy ORM Models
Defines the Product and CartItem tables.
"""
import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from app.database import Base


class Product(Base):
    """
    Represents a product in the Auraloom store.
    Each product belongs to a 'universe' (category).
    """
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=False)
    category = Column(String(100), nullable=False, index=True)  # Universe slug
    customization_type = Column(
        String(50), default="none"
    )  # "text", "dropdown", or "none"
    customization_options = Column(
        Text, default="[]"
    )  # JSON string for dropdown options
    in_stock = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', category='{self.category}')>"


class CartItem(Base):
    """
    Represents an item in a user's cart.
    Uses session_id for simple session-based cart tracking (no auth).
    """
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    customization_value = Column(String(500), default="")
    session_id = Column(String(100), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationship to product
    product = relationship("Product", back_populates="cart_items")

    def __repr__(self):
        return f"<CartItem(id={self.id}, product_id={self.product_id}, qty={self.quantity})>"


class AdminUser(Base):
    """Admin user for the dashboard."""
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)


class Order(Base):
    """Customer order."""
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_name = Column(String(100), nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(String(50), default="Pending")  # Pending, Completed, Cancelled
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    """Individual item in an order."""
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    price = Column(Float, nullable=False)  # Price at the time of order

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
