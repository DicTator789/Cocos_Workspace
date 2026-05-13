/**
 * Auraloom — CollectionPage
 * Product grid for a specific universe/category.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/client';

const UNIVERSE_META = {
  'karosiya-flowers': { name: 'Karosiya Flowers', emoji: '🌸', desc: 'Handcrafted floral arrangements that breathe life into spaces' },
  'canvas-paintings': { name: 'Canvas Paintings', emoji: '🎨', desc: 'Original artwork that speaks to the soul' },
  'bookmarks': { name: 'Bookmarks', emoji: '📖', desc: 'Tiny treasures that mark your literary journeys' },
  'wall-paintings': { name: 'Wall Paintings', emoji: '🖼️', desc: 'Statement pieces that transform your walls into galleries' },
  'custom-made': { name: 'Custom Made', emoji: '✨', desc: 'Bespoke creations tailored to your vision' },
};

export default function CollectionPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const meta = UNIVERSE_META[category] || { name: category, emoji: '🎁', desc: '' };

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then((data) => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="py-20 md:py-28 text-center border-b border-[var(--color-border)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl mb-4 block">{meta.emoji}</span>
          <h1
            className="text-4xl md:text-6xl tracking-[0.1em] text-[var(--color-text-primary)] mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            {meta.name}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            {meta.desc}
          </p>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-8 opacity-40" />
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 border-b border-[var(--color-border)]/50">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] tracking-wider">
          <Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{meta.name}</span>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-[var(--color-bg-surface)] mb-4" />
                <div className="h-4 bg-[var(--color-bg-surface)] w-3/4 mb-2" />
                <div className="h-3 bg-[var(--color-bg-surface)] w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-muted)]">No products found in this universe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Product count */}
        {!loading && products.length > 0 && (
          <p className="text-center text-xs text-[var(--color-text-muted)] tracking-wider mt-12">
            Showing {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        )}
      </section>
    </div>
  );
}
