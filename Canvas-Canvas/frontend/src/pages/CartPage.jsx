/**
 * Auraloom — CartPage
 * Full cart view with items, quantities, totals, and checkout placeholder.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 text-center border-b border-[var(--color-border)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl tracking-[0.1em] text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}>
            Your Cart
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <span className="text-6xl block mb-6">🛒</span>
            <h2 className="text-2xl text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Your cart is empty
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">Discover our handcrafted universes</p>
            <Link to="/" className="btn-shimmer inline-block">Explore Collections</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-0">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[var(--color-border)] text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-[var(--color-border)]/50 items-center"
                >
                  {/* Product */}
                  <div className="md:col-span-6 flex gap-4">
                    <Link to={`/product/${item.product.id}`}>
                      <img src={item.product.image_url} alt={item.product.name} className="w-20 h-24 object-cover bg-[var(--color-bg-surface)]" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.product.id}`} className="text-sm text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.product.name}
                      </Link>
                      {item.customization_value && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.customization_value}</p>
                      )}
                      <button onClick={() => removeItem(item.id)} className="text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors mt-2 text-left">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="inline-flex items-center border border-[var(--color-border)]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">−</button>
                      <span className="px-3 py-2 text-xs min-w-[32px] text-center border-x border-[var(--color-border)]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">+</button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-right text-sm text-[var(--color-text-secondary)]">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 text-right text-sm text-[var(--color-gold)]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-6">
                <h3 className="text-lg tracking-[0.1em] mb-6 pb-4 border-b border-[var(--color-border)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Shipping</span>
                    <span className="text-[var(--color-text-muted)]">Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between py-4 border-t border-[var(--color-border)] mb-6">
                  <span className="text-sm tracking-wider uppercase">Total</span>
                  <span className="text-xl text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button className="btn-gold w-full mb-3">Proceed to Checkout</button>
                <Link to="/" className="block text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors tracking-wider">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
