import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import ProductOut
from app.auth import get_current_admin

router = APIRouter(prefix="/api/admin/products", tags=["Admin Products"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("", response_model=list[ProductOut])
def get_all_products(db: Session = Depends(get_db), current_admin = Depends(get_current_admin)):
    return db.query(Product).order_by(Product.created_at.desc()).all()

@router.post("", response_model=ProductOut)
async def create_product(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    in_stock: bool = Form(True),
    customization_type: str = Form("none"),
    customization_options: str = Form("[]"),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    image_url = ""
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(await image.read())
        image_url = f"/uploads/{filename}"

    new_product = Product(
        name=name,
        description=description,
        price=price,
        category=category,
        image_url=image_url,
        in_stock=in_stock,
        customization_type=customization_type,
        customization_options=customization_options
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/{product_id}", response_model=ProductOut)
async def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    in_stock: bool = Form(True),
    customization_type: str = Form("none"),
    customization_options: str = Form("[]"),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(await image.read())
        product.image_url = f"/uploads/{filename}"

    product.name = name
    product.description = description
    product.price = price
    product.category = category
    product.in_stock = in_stock
    product.customization_type = customization_type
    product.customization_options = customization_options

    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db), current_admin = Depends(get_current_admin)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
