/**
 * Auraloom — Cart Context
 * React Context + useReducer for global cart state management.
 * Syncs with the backend API for persistence.
 */
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '../api/client';

// ── Context ─────────────────────────────────────────────
const CartContext = createContext(null);

// ── Action Types ────────────────────────────────────────
const ACTIONS = {
  SET_CART: 'SET_CART',
  SET_LOADING: 'SET_LOADING',
  SET_DRAWER_OPEN: 'SET_DRAWER_OPEN',
};

// ── Initial State ───────────────────────────────────────
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  isDrawerOpen: false,
};

// ── Reducer ─────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.total_items,
        totalPrice: action.payload.total_price,
        isLoading: false,
      };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_DRAWER_OPEN:
      return { ...state, isDrawerOpen: action.payload };
    default:
      return state;
  }
}

// ── Provider Component ──────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart on mount
  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const cart = await getCart();
      dispatch({ type: ACTIONS.SET_CART, payload: cart });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ── Cart Actions ────────────────────────────────────
  const addItem = useCallback(async (productId, quantity = 1, customizationValue = '') => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await apiAddToCart(productId, quantity, customizationValue);
      await fetchCart(); // Refresh full cart from backend
      dispatch({ type: ACTIONS.SET_DRAWER_OPEN, payload: true });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      if (quantity <= 0) {
        await apiRemoveFromCart(itemId);
      } else {
        await updateCartItem(itemId, quantity);
      }
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [fetchCart]);

  const removeItem = useCallback(async (itemId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await apiRemoveFromCart(itemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [fetchCart]);

  const toggleDrawer = useCallback((open) => {
    dispatch({ type: ACTIONS.SET_DRAWER_OPEN, payload: open ?? !state.isDrawerOpen });
  }, [state.isDrawerOpen]);

  const value = {
    ...state,
    addItem,
    updateQuantity,
    removeItem,
    toggleDrawer,
    refreshCart: fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
