/**
 * Auraloom — ProductCard Component
 * Displays a product in the collection grid with hover effects.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-[var(--color-bg-surface)] aspect-[3/4] mb-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-card-image w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
            <span className="text-xs tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 border border-white/50 px-6 py-3">
              View Details
            </span>
          </div>
          {!product.in_stock && (
            <div className="absolute top-3 left-3 bg-[var(--color-bg-primary)]/80 text-[var(--color-text-muted)] text-[0.65rem] tracking-[0.15em] uppercase px-3 py-1">
              Sold Out
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
