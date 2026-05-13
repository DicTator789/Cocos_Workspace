"""
Auraloom — Database Seeder
Populates the database with 25 sample products across 5 universes.
Each universe gets 5 products with realistic names, descriptions, and prices.
Uses Unsplash for free placeholder images.
"""
import json
from sqlalchemy.orm import Session
from app.models import Product


# ── Universe/Category definitions ────────────────────────
UNIVERSES = {
    "karosiya-flowers": {
        "name": "Karosiya Flowers Universe",
        "description": "Handcrafted floral arrangements that breathe life into spaces"
    },
    "canvas-paintings": {
        "name": "Canvas Paintings Universe",
        "description": "Original artwork that speaks to the soul"
    },
    "bookmarks": {
        "name": "Bookmark Universe",
        "description": "Tiny treasures that mark your literary journeys"
    },
    "wall-paintings": {
        "name": "Wall Paintings Universe",
        "description": "Statement pieces that transform your walls into galleries"
    },
    "custom-made": {
        "name": "Custom Made Universe",
        "description": "Bespoke creations tailored to your vision"
    },
}


# ── Sample Products ──────────────────────────────────────
SEED_PRODUCTS = [
    # ─── Karosiya Flowers Universe ───
    {
        "name": "Royal Rose Arrangement",
        "description": "A luxurious arrangement of hand-selected roses in deep crimson and blush pink, nestled in a golden ceramic vase. Each petal is carefully preserved to maintain its natural beauty for months. Perfect as a centerpiece or a heartfelt gift.",
        "price": 1499.00,
        "image_url": "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop",
        "category": "karosiya-flowers",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Red & Pink", "White & Gold", "Purple & Lavender", "Sunset Orange"]),
    },
    {
        "name": "Marigold Mandala",
        "description": "An intricate mandala pattern crafted entirely from dried marigold petals. This stunning piece captures the warmth of Indian traditions, bringing prosperity and positive energy to any room. Framed in a handmade wooden border.",
        "price": 2199.00,
        "image_url": "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop",
        "category": "karosiya-flowers",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Small (8 inch)", "Medium (12 inch)", "Large (16 inch)"]),
    },
    {
        "name": "Jasmine Dream Bouquet",
        "description": "Delicate jasmine flowers woven into a cascading bouquet that fills your space with an intoxicating natural fragrance. Each bouquet is hand-tied with silk ribbon and comes in an elegant gift box.",
        "price": 899.00,
        "image_url": "https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=600&h=600&fit=crop",
        "category": "karosiya-flowers",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Lotus Crown Wreath",
        "description": "A majestic circular wreath featuring hand-crafted lotus flowers in soft pastels. Symbolizing purity and enlightenment, this piece adds a serene, spiritual energy to your living space or meditation corner.",
        "price": 1799.00,
        "image_url": "https://images.unsplash.com/photo-1525310379093-363e85fb4503?w=600&h=600&fit=crop",
        "category": "karosiya-flowers",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Pastel Pink", "White & Gold", "Natural Green"]),
    },
    {
        "name": "Sunflower Symphony",
        "description": "A vibrant collection of preserved sunflowers arranged in a rustic terracotta pot. These golden blooms bring the warmth of summer indoors, lasting for years without water. Each arrangement is unique and one-of-a-kind.",
        "price": 1299.00,
        "image_url": "https://images.unsplash.com/photo-1551945326-df678dfe3f7f?w=600&h=600&fit=crop",
        "category": "karosiya-flowers",
        "customization_type": "none",
        "customization_options": "[]",
    },

    # ─── Canvas Paintings Universe ───
    {
        "name": "Midnight Abstract",
        "description": "A captivating abstract piece in deep midnight blues and shimmering gold. Bold brush strokes create a sense of depth and movement, making this painting a conversation starter. Hand-painted on premium cotton canvas with gallery-wrap finish.",
        "price": 3499.00,
        "image_url": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
        "category": "canvas-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["12x16 inch", "18x24 inch", "24x36 inch"]),
    },
    {
        "name": "Golden Horizon",
        "description": "A breathtaking landscape painting capturing the moment when golden sunlight meets the endless horizon. Warm earth tones blend seamlessly with amber skies. Each piece is hand-signed by the artist.",
        "price": 4299.00,
        "image_url": "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=600&fit=crop",
        "category": "canvas-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["12x16 inch", "18x24 inch", "24x36 inch"]),
    },
    {
        "name": "Urban Decay Series",
        "description": "Part of our limited urban art collection, this piece explores the beauty in industrial landscapes. Textured layers of paint create a raw, authentic feel. Mixed media on stretched canvas with distressed edges.",
        "price": 2899.00,
        "image_url": "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=600&fit=crop",
        "category": "canvas-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Small", "Medium", "Large"]),
    },
    {
        "name": "Monsoon Dreams",
        "description": "Inspired by the first rains of the monsoon season, this painting uses fluid acrylic techniques to capture the dance of raindrops. Shades of teal, grey, and silver create a calming, meditative atmosphere.",
        "price": 3999.00,
        "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
        "category": "canvas-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["18x24 inch", "24x36 inch"]),
    },
    {
        "name": "Cosmic Nebula",
        "description": "A mesmerizing cosmic scene painted with UV-reactive paints that glow under blacklight. Swirling galaxies and distant stars create an otherworldly experience. Perfect for creative spaces and bedrooms.",
        "price": 4999.00,
        "image_url": "https://images.unsplash.com/photo-1534759926787-89fa60a7ae0c?w=600&h=600&fit=crop",
        "category": "canvas-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["18x24 inch", "24x36 inch", "36x48 inch"]),
    },

    # ─── Bookmark Universe ───
    {
        "name": "Pressed Flower Bookmark",
        "description": "Delicate real flowers carefully pressed and preserved between layers of clear resin. Each bookmark is a unique piece of nature, featuring wildflowers hand-picked from local meadows. Comes with a silk tassel.",
        "price": 349.00,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
        "category": "bookmarks",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Lavender Fields", "Rose Garden", "Wildflower Mix", "Fern & Moss"]),
    },
    {
        "name": "Calligraphy Zen",
        "description": "Hand-lettered bookmark featuring a beautiful calligraphy quote in metallic gold ink on handmade paper. Choose your favorite quote or request a custom one. Each piece is a miniature work of art.",
        "price": 249.00,
        "image_url": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=600&fit=crop",
        "category": "bookmarks",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Mandala Edge Bookmark",
        "description": "Intricate mandala patterns hand-drawn with fine-point ink pens on premium card stock. The detailed geometric designs are inspired by sacred geometry and meditation practices. Laminated for durability.",
        "price": 199.00,
        "image_url": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
        "category": "bookmarks",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Black & Gold", "Navy & Silver", "Burgundy & Rose Gold"]),
    },
    {
        "name": "Vintage Lace Bookmark",
        "description": "A romantic vintage-style bookmark featuring hand-tatted lace trim and antique brass charm. Inspired by Victorian-era elegance, this bookmark transforms your reading experience into a luxurious ritual.",
        "price": 399.00,
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
        "category": "bookmarks",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["Ivory", "Blush Pink", "Antique Gold"]),
    },
    {
        "name": "Celestial Gold Leaf",
        "description": "A premium bookmark adorned with real gold leaf and celestial motifs — moons, stars, and constellations. Hand-crafted on thick watercolor paper with a gold-foil edge. Makes an exquisite gift for book lovers.",
        "price": 499.00,
        "image_url": "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=600&fit=crop",
        "category": "bookmarks",
        "customization_type": "none",
        "customization_options": "[]",
    },

    # ─── Wall Paintings Universe ───
    {
        "name": "Sacred Geometry Mural",
        "description": "A large-scale wall painting featuring intricate sacred geometry patterns in metallic gold on a deep black background. This statement piece transforms any wall into a focal point of spiritual elegance.",
        "price": 4499.00,
        "image_url": "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=600&h=600&fit=crop",
        "category": "wall-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["2x3 feet", "3x4 feet", "4x6 feet"]),
    },
    {
        "name": "Mountain Twilight",
        "description": "A panoramic wall painting capturing the magical twilight hour over snow-capped mountains. The gradient sky transitions from deep purple to warm amber, creating a sense of infinite calm and wonder.",
        "price": 3799.00,
        "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
        "category": "wall-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["2x3 feet", "3x4 feet", "4x6 feet"]),
    },
    {
        "name": "Ocean of Stars",
        "description": "A dreamy wall painting that merges an oceanic seascape with a starlit sky. The reflection of constellations on calm waters creates a surreal, meditative scene. Painted with glow-in-the-dark accents.",
        "price": 4999.00,
        "image_url": "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&h=600&fit=crop",
        "category": "wall-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["3x4 feet", "4x6 feet"]),
    },
    {
        "name": "Desert Bloom",
        "description": "An evocative wall painting depicting a lone desert landscape bursting with unexpected blooms. Warm sand tones contrast with vibrant wildflowers, symbolizing resilience and beauty in harsh environments.",
        "price": 3299.00,
        "image_url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=600&fit=crop",
        "category": "wall-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["2x3 feet", "3x4 feet", "4x6 feet"]),
    },
    {
        "name": "Ethereal Forest",
        "description": "Step into an enchanted forest with this atmospheric wall painting. Rays of golden sunlight filter through ancient trees, illuminating a misty woodland floor. Each piece is hand-finished with a textured varnish.",
        "price": 3999.00,
        "image_url": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=600&fit=crop",
        "category": "wall-paintings",
        "customization_type": "dropdown",
        "customization_options": json.dumps(["2x3 feet", "3x4 feet"]),
    },

    # ─── Custom Made Universe ───
    {
        "name": "Custom Portrait Commission",
        "description": "A hand-painted portrait created from your photograph. Our artists capture every detail with meticulous brushwork, transforming your cherished memories into timeless art. Includes consultation and revision rounds.",
        "price": 4999.00,
        "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
        "category": "custom-made",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Personalized Name Art",
        "description": "Your name or word of choice, transformed into a stunning piece of decorative typography. Hand-lettered in your chosen style and embellished with floral or geometric motifs. Perfect for nurseries, offices, or gifts.",
        "price": 1499.00,
        "image_url": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop",
        "category": "custom-made",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Bespoke Gift Box",
        "description": "A curated gift box tailored to your occasion. Choose from our collection of handmade items — flowers, bookmarks, mini paintings — and we'll arrange them in a beautifully wrapped premium box with a personal note.",
        "price": 2499.00,
        "image_url": "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=600&h=600&fit=crop",
        "category": "custom-made",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Hand-Lettered Quote Frame",
        "description": "Your favorite quote, poem, or lyrics hand-lettered in elegant calligraphy on premium watercolor paper. Framed in a minimalist black or gold frame. A deeply personal piece that makes any space feel like home.",
        "price": 999.00,
        "image_url": "https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?w=600&h=600&fit=crop",
        "category": "custom-made",
        "customization_type": "text",
        "customization_options": "[]",
    },
    {
        "name": "Custom Wedding Keepsake",
        "description": "A one-of-a-kind wedding keepsake featuring pressed flowers from your bouquet, preserved in resin alongside your names and wedding date in gold foil calligraphy. A timeless memento of your special day.",
        "price": 3499.00,
        "image_url": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=600&fit=crop",
        "category": "custom-made",
        "customization_type": "text",
        "customization_options": "[]",
    },
]


def seed_database(db: Session) -> None:
    """
    Seeds the database with sample products if the table is empty.
    Called during application startup.
    """
    # Check if products already exist
    existing_count = db.query(Product).count()
    if existing_count > 0:
        print(f"  [OK] Database already has {existing_count} products. Skipping seed.")
        return

    print("  [..] Seeding database with sample products...")

    for product_data in SEED_PRODUCTS:
        product = Product(**product_data)
        db.add(product)

    db.commit()
    print(f"  [OK] Seeded {len(SEED_PRODUCTS)} products across {len(UNIVERSES)} universes.")
