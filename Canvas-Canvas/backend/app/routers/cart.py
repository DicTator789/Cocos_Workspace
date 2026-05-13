"""
Auraloom — Cart Router
Handles shopping cart CRUD operations.
Uses a simple session_id header for cart tracking (no authentication).
"""
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import CartItem, Product
from app.schemas import CartItemCreate, CartItemUpdate, CartItemOut, CartOut

router = APIRouter(prefix="/api/cart", tags=["Cart"])


def get_session_id(x_session_id: str = Header(..., description="Client session ID")) -> str:
    """Extract session ID from request header."""
    return x_session_id


@router.get("", response_model=CartOut)
def get_cart(
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_db),
):
    """
    Get all items in the current session's cart.
    """
    items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.session_id == session_id)
        .all()
    )

    total_items = sum(item.quantity for item in items)
    total_price = sum(item.quantity * item.product.price for item in items)

    return CartOut(
        items=[CartItemOut.model_validate(item) for item in items],
        total_items=total_items,
        total_price=round(total_price, 2),
    )


@router.post("", response_model=CartItemOut, status_code=201)
def add_to_cart(
    cart_item: CartItemCreate,
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_db),
):
    """
    Add a product to the cart.
    If the product is already in the cart (same customization), increment quantity.
    """
    # Verify the product exists
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Check if same product + customization already in cart
    existing = (
        db.query(CartItem)
        .filter(
            CartItem.session_id == session_id,
            CartItem.product_id == cart_item.product_id,
            CartItem.customization_value == cart_item.customization_value,
        )
        .first()
    )

    if existing:
        # Increment quantity
        existing.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing)
        return CartItemOut.model_validate(existing)

    # Create new cart item
    new_item = CartItem(
        product_id=cart_item.product_id,
        quantity=cart_item.quantity,
        customization_value=cart_item.customization_value,
        session_id=session_id,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    # Eagerly load the product relationship
    db.refresh(new_item, ["product"])

    return CartItemOut.model_validate(new_item)


@router.put("/{item_id}", response_model=CartItemOut)
def update_cart_item(
    item_id: int,
    update: CartItemUpdate,
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_db),
):
    """
    Update cart item quantity.
    If quantity is 0, the item is removed.
    """
    item = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.id == item_id, CartItem.session_id == session_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if update.quantity == 0:
        db.delete(item)
        db.commit()
        raise HTTPException(status_code=204, detail="Item removed from cart")

    item.quantity = update.quantity
    db.commit()
    db.refresh(item)

    return CartItemOut.model_validate(item)


@router.delete("/{item_id}", status_code=204)
def remove_from_cart(
    item_id: int,
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_db),
):
    """
    Remove an item from the cart.
    """
    item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id, CartItem.session_id == session_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(item)
    db.commit()
