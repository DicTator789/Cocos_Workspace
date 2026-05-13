"""
Auraloom — Pydantic Schemas
Request/response models for the API.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ── Product Schemas ──────────────────────────────────────

class ProductBase(BaseModel):
    """Base product fields."""
    name: str
    description: str
    price: float
    image_url: str
    category: str
    customization_type: str = "none"
    customization_options: str = "[]"
    in_stock: bool = True


class ProductOut(ProductBase):
    """Product response model — includes id and timestamp."""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 ORM mode


class ProductList(BaseModel):
    """Paginated product list response."""
    products: list[ProductOut]
    total: int
    category: Optional[str] = None


# ── Cart Schemas ─────────────────────────────────────────

class CartItemCreate(BaseModel):
    """Request body for adding an item to cart."""
    product_id: int
    quantity: int = Field(default=1, ge=1)
    customization_value: str = ""


class CartItemUpdate(BaseModel):
    """Request body for updating cart item quantity."""
    quantity: int = Field(ge=0)  # 0 means remove


class CartItemOut(BaseModel):
    """Cart item response — includes product details."""
    id: int
    product_id: int
    quantity: int
    customization_value: str
    product: ProductOut

    class Config:
        from_attributes = True


class CartOut(BaseModel):
    """Full cart response with items and total."""
    items: list[CartItemOut]
    total_items: int
    total_price: float


# ── Category Schema ──────────────────────────────────────

class CategoryOut(BaseModel):
    """Category (universe) response."""
    slug: str
    name: str
    description: str
    product_count: int


# ── Admin Schemas ────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None


# ── Order Schemas ────────────────────────────────────────
class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    product: ProductOut

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    customer_name: str
    total_price: float
    status: str
    created_at: datetime
    items: list[OrderItemOut]

    class Config:
        from_attributes = True

class OrderList(BaseModel):
    orders: list[OrderOut]
    total: int
