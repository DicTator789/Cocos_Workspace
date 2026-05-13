/**
 * Auraloom — API Client
 * Axios-based HTTP client for communicating with the FastAPI backend.
 * Handles session ID management for cart tracking.
 */
import axios from 'axios';

// ── Base URL ────────────────────────────────────────────
// In dev: Vite proxy handles /api → localhost:8000
// In prod/Docker: nginx proxies /api → backend:8000
const API_BASE = '/api';

// ── Session ID Management ───────────────────────────────
// Simple UUID stored in localStorage for cart session tracking
function getSessionId() {
  let sessionId = localStorage.getItem('auraloom_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('auraloom_session_id', sessionId);
  }
  return sessionId;
}

// ── Axios Instance ──────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach session ID to every request
api.interceptors.request.use((config) => {
  config.headers['X-Session-Id'] = getSessionId();
  return config;
});

// ── Product APIs ────────────────────────────────────────

/**
 * Fetch all products, optionally filtered by category.
 * @param {string|null} category - Universe slug to filter by
 */
export async function getProducts(category = null) {
  const params = category ? { category } : {};
  const { data } = await api.get('/products', { params });
  return data;
}

/**
 * Fetch a single product by ID.
 * @param {number} id - Product ID
 */
export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

/**
 * Fetch all categories (universes).
 */
export async function getCategories() {
  const { data } = await api.get('/products/categories');
  return data;
}

// ── Cart APIs ───────────────────────────────────────────

/**
 * Get the current cart contents.
 */
export async function getCart() {
  const { data } = await api.get('/cart');
  return data;
}

/**
 * Add an item to the cart.
 * @param {number} productId - Product ID
 * @param {number} quantity - Quantity to add
 * @param {string} customizationValue - Customization choice
 */
export async function addToCart(productId, quantity = 1, customizationValue = '') {
  const { data } = await api.post('/cart', {
    product_id: productId,
    quantity,
    customization_value: customizationValue,
  });
  return data;
}

/**
 * Update cart item quantity.
 * @param {number} itemId - Cart item ID
 * @param {number} quantity - New quantity (0 to remove)
 */
export async function updateCartItem(itemId, quantity) {
  const { data } = await api.put(`/cart/${itemId}`, { quantity });
  return data;
}

/**
 * Remove an item from the cart.
 * @param {number} itemId - Cart item ID
 */
export async function removeFromCart(itemId) {
  await api.delete(`/cart/${itemId}`);
}

export default api;
