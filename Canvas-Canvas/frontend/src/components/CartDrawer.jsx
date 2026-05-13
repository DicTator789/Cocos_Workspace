/**
 * Auraloom — CartDrawer Component
 * Slide-in cart panel from the right side.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isDrawerOpen, toggleDrawer, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[var(--color-bg-surface)] border-l border-[var(--color-border)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
              <h2 className="text-lg tracking-[0.1em]" style={{ fontFamily: 'var(--font-heading)' }}>
                Your Cart ({totalItems})
              </h2>
              <button
                onClick={() => toggleDrawer(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl mb-4">🛒</span>
                  <p className="text-[var(--color-text-muted)] text-sm mb-6">Your cart is empty</p>
                  <button onClick={() => toggleDrawer(false)} className="btn-shimmer text-xs">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartDrawerItem key={item.id} item={item} onUpdateQty={updateQuantity} onRemove={removeItem} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--color-border)] px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--color-text-secondary)] tracking-wider uppercase">Subtotal</span>
                  <span className="text-lg text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => toggleDrawer(false)}
                  className="btn-gold block text-center w-full"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartDrawerItem({ item, onUpdateQty, onRemove }) {
  return (
    <motion.div layout className="flex gap-4 py-3 border-b border-[var(--color-border)]/50">
      <img src={item.product.image_url} alt={item.product.name} className="w-20 h-24 object-cover bg-[var(--color-bg-elevated)]" />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {item.product.name}
          </h4>
          {item.customization_value && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.customization_value}</p>
          )}
          <p className="text-sm text-[var(--color-gold)] mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 border border-[var(--color-border)] px-2 py-1">
            <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-sm">−</button>
            <span className="text-xs min-w-[16px] text-center">{item.quantity}</span>
            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-sm">+</button>
          </div>
          <button onClick={() => onRemove(item.id)} className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors text-xs">
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}
