# 🎨 Auraloom — Weaving Emotions into Art

A premium, portfolio-worthy e-commerce platform for handmade and custom products. Built with **FastAPI** + **React** + **Tailwind CSS** + **SQLite** + **Docker**.

![Auraloom](https://img.shields.io/badge/Auraloom-Weaving%20Emotions%20into%20Art-c9a96e?style=for-the-badge&labelColor=0a0a0a)

---

## ✨ Features

- **5 Product Universes**: Karosiya Flowers, Canvas Paintings, Bookmarks, Wall Paintings, Custom Made
- **Immersive Homepage**: Full-screen universe sections with parallax effects and smooth animations
- **Collection Pages**: Responsive product grids with hover effects and loading skeletons
- **Product Detail**: Large images, descriptions, customization options, add-to-cart
- **Shopping Cart**: Add/remove items, quantity controls, order summary
- **Luxury Design**: Black & gold palette, serif typography, Framer Motion animations
- **Responsive**: Mobile-first design that works on all devices
- **Dockerized**: One command to run everything

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.11, FastAPI, SQLAlchemy, Pydantic |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion |
| **Database** | SQLite (local, zero-config) |
| **Container** | Docker, Docker Compose |
| **Fonts** | Cormorant Garamond + Inter (Google Fonts) |

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone and navigate to the project
cd Canvas-Canvas

# Build and run both containers
docker-compose up --build

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Local Development

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Opens at http://localhost:5173
```

---

## 📁 Project Structure

```
Canvas-Canvas/
├── docker-compose.yml          # Docker orchestration
├── .env                        # Environment variables
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # FastAPI app entry point
│       ├── database.py         # SQLite + SQLAlchemy config
│       ├── models.py           # ORM models (Product, CartItem)
│       ├── schemas.py          # Pydantic validation schemas
│       ├── seed.py             # Sample data seeder (25 products)
│       └── routers/
│           ├── products.py     # Product API endpoints
│           └── cart.py         # Cart API endpoints
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf              # Production nginx config
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx             # Root component + routing
│       ├── index.css           # Design system + Tailwind
│       ├── api/client.js       # API client (Axios)
│       ├── context/CartContext.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProductCard.jsx
│       │   ├── CartDrawer.jsx
│       │   └── UniverseSection.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── CollectionPage.jsx
│           ├── ProductPage.jsx
│           └── CartPage.jsx
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List products (optional `?category=` filter) |
| `GET` | `/api/products/{id}` | Get product details |
| `GET` | `/api/products/categories` | List all universes |
| `POST` | `/api/cart` | Add item to cart |
| `GET` | `/api/cart` | Get cart contents |
| `PUT` | `/api/cart/{id}` | Update item quantity |
| `DELETE` | `/api/cart/{id}` | Remove item from cart |
| `GET` | `/api/health` | Health check |

📖 **Interactive API docs**: http://localhost:8000/docs

---

## 🎨 Design Philosophy

- **Art-first layout**: Products are the heroes, UI stays out of the way
- **Luxury aesthetic**: Dark backgrounds, gold accents, serif headings
- **Smooth animations**: Framer Motion for scroll reveals, page transitions, micro-interactions
- **Responsive**: Designed mobile-first, scales beautifully to desktop

---

## 🌍 Universes

| Universe | Products | Price Range |
|----------|----------|-------------|
| 🌸 Karosiya Flowers | 5 | ₹899 — ₹2,199 |
| 🎨 Canvas Paintings | 5 | ₹2,899 — ₹4,999 |
| 📖 Bookmarks | 5 | ₹199 — ₹499 |
| 🖼️ Wall Paintings | 5 | ₹3,299 — ₹4,999 |
| ✨ Custom Made | 5 | ₹999 — ₹4,999 |

---

## 📝 License

This project is for educational and portfolio purposes. Feel free to use and modify.

---

<p align="center">
  <strong>Auraloom</strong> — Weaving Emotions into Art<br/>
  <em>Handcrafted with ♥ in India</em>
</p>
