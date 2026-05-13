/**
 * Auraloom — HomePage
 * Full-screen immersive landing with hero + universe sections.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UniverseSection from '../components/UniverseSection';
import { getCategories } from '../api/client';

// Universe data with fallbacks
const DEFAULT_UNIVERSES = [
  { slug: 'karosiya-flowers', name: 'Karosiya Flowers Universe' },
  { slug: 'canvas-paintings', name: 'Canvas Paintings Universe' },
  { slug: 'bookmarks', name: 'Bookmark Universe' },
  { slug: 'wall-paintings', name: 'Wall Paintings Universe' },
  { slug: 'custom-made', name: 'Custom Made Universe' },
];

export default function HomePage() {
  const [universes, setUniverses] = useState(DEFAULT_UNIVERSES);

  useEffect(() => {
    getCategories()
      .then((cats) => {
        if (cats.length > 0) setUniverses(cats);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grain-overlay">
      {/* ── Hero Section ──────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-8"
            style={{ background: 'var(--color-gold)' }}
          />
          <motion.div
            animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-5"
            style={{ background: '#c9a96e' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-16 h-px bg-[var(--color-gold)] mx-auto mb-8 opacity-60"
          />

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            <span className="text-gradient-gold">AURALOOM</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-[var(--color-text-secondary)] mb-12"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Weaving Emotions into Art
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-[var(--color-text-muted)] max-w-lg mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
          >
            Discover handcrafted treasures across five unique universes.
            Each piece is a story, each creation a masterpiece.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-[var(--color-gold)] to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Universe Sections ────────────────────── */}
      {universes.map((universe, index) => (
        <UniverseSection
          key={universe.slug}
          slug={universe.slug}
          name={universe.name}
          index={index}
        />
      ))}

      {/* ── Bottom CTA Section ───────────────────── */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto px-6"
        >
          <h2
            className="text-4xl md:text-5xl tracking-[0.1em] text-[var(--color-text-primary)] mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
          >
            Every Piece Tells a Story
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            From the delicate petals of Karosiya flowers to the bold strokes of canvas art,
            each creation is infused with emotion, crafted by hand, and made with love.
          </p>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto opacity-40" />
        </motion.div>
      </section>
    </div>
  );
}
