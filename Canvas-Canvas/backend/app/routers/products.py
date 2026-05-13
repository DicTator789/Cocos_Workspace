"""
Auraloom — Products Router
Handles product listing, filtering, and detail retrieval.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional

from app.database import get_db
from app.models import Product
from app.schemas import ProductOut, ProductList, CategoryOut
from app.seed import UNIVERSES

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("", response_model=ProductList)
def list_products(
    category: Optional[str] = Query(None, description="Filter by universe/category slug"),
    db: Session = Depends(get_db),
):
    """
    List all products, optionally filtered by category (universe).
    Returns products with total count.
    """
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)

    products = query.order_by(Product.created_at.desc()).all()
    total = len(products)

    return ProductList(
        products=[ProductOut.model_validate(p) for p in products],
        total=total,
        category=category,
    )


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    """
    List all universes/categories with product counts.
    """
    # Get product counts per category from DB
    counts = (
        db.query(Product.category, func.count(Product.id))
        .group_by(Product.category)
        .all()
    )
    count_map = dict(counts)

    categories = []
    for slug, info in UNIVERSES.items():
        categories.append(
            CategoryOut(
                slug=slug,
                name=info["name"],
                description=info["description"],
                product_count=count_map.get(slug, 0),
            )
        )

    return categories


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Get a single product by ID.
    Raises 404 if not found.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.model_validate(product)
