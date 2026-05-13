/**
 * Auraloom — ProductPage
 * Single product detail with image, description, customization, and add-to-cart.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct } from '../api/client';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customValue, setCustomValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem(product.id, quantity, customValue);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const options = product?.customization_options ? JSON.parse(product.customization_options) : [];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--color-text-muted)]">Product not found</p>
        <Link to="/" className="btn-shimmer">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 border-b border-[var(--color-border)]/50">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] tracking-wider">
          <Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/collections/${product.category}`} className="hover:text-[var(--color-gold)] transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-[var(--color-bg-surface)] aspect-square group"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
              {product.category.replace(/-/g, ' ')}
            </span>

            <h1 className="text-3xl md:text-4xl tracking-[0.05em] text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              {product.name}
            </h1>

            <p className="text-2xl text-[var(--color-gold)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <div className="w-12 h-px bg-[var(--color-border)] mb-6" />

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Customization */}
            {product.customization_type === 'dropdown' && options.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                  Choose Option
                </label>
                <select
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}

            {product.customization_type === 'text' && (
              <div className="mb-6">
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                  Customization Details
                </label>
                <textarea
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Enter your customization request..."
                  rows={3}
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                />
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-[var(--color-border)]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">−</button>
                <span className="px-4 py-3 text-sm min-w-[40px] text-center border-x border-[var(--color-border)]">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`w-full py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                added
                  ? 'bg-green-800 text-green-100 border border-green-700'
                  : product.in_stock
                  ? 'btn-gold'
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] cursor-not-allowed'
              }`}
            >
              {added ? '✓ Added to Cart' : product.in_stock ? 'Add to Cart' : 'Sold Out'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
