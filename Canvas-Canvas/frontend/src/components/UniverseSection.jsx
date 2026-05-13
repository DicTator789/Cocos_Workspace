/**
 * Auraloom — UniverseSection Component
 * Full-viewport homepage section representing a product universe/category.
 * Features parallax background, animated text reveal, and "Enter" CTA.
 */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Universe visual configs ─────────────────────────────
const UNIVERSE_STYLES = {
  'karosiya-flowers': {
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 30%, #1a0f0a 60%, #0a0a0a 100%)',
    accent: '#e8a0a0',
    emoji: '🌸',
    subtitle: 'Handcrafted floral arrangements that breathe life into spaces',
  },
  'canvas-paintings': {
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #151530 30%, #0a1020 60%, #0a0a0a 100%)',
    accent: '#8090d0',
    emoji: '🎨',
    subtitle: 'Original artwork that speaks to the soul',
  },
  'bookmarks': {
    gradient: 'linear-gradient(135deg, #0a100a 0%, #152015 30%, #0a150a 60%, #0a0a0a 100%)',
    accent: '#90c890',
    emoji: '📖',
    subtitle: 'Tiny treasures that mark your literary journeys',
  },
  'wall-paintings': {
    gradient: 'linear-gradient(135deg, #15100a 0%, #251a10 30%, #1a100a 60%, #0a0a0a 100%)',
    accent: '#d4a060',
    emoji: '🖼️',
    subtitle: 'Statement pieces that transform your walls into galleries',
  },
  'custom-made': {
    gradient: 'linear-gradient(135deg, #100a15 0%, #1a1025 30%, #0f0a1a 60%, #0a0a0a 100%)',
    accent: '#b090d0',
    emoji: '✨',
    subtitle: 'Bespoke creations tailored to your vision',
  },
};

export default function UniverseSection({ slug, name, index }) {
  const ref = useRef(null);
  const style = UNIVERSE_STYLES[slug] || UNIVERSE_STYLES['custom-made'];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
      style={{ background: style.gradient }}
    >
      {/* Animated background glow */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: style.accent,
            top: '20%',
            left: isEven ? '60%' : '10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
          style={{
            background: 'var(--color-gold)',
            bottom: '20%',
            right: isEven ? '60%' : '10%',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col ${
          isEven ? 'items-start text-left' : 'items-end text-right'
        }`}
      >
        {/* Universe number */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs tracking-[0.4em] uppercase text-[var(--color-text-muted)] mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Universe {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Universe emoji */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl mb-6"
        >
          {style.emoji}
        </motion.span>

        {/* Universe name */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-[var(--color-text-primary)] mb-4"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
        >
          {name.replace(' Universe', '')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-md mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {style.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            to={`/collections/${slug}`}
            className="btn-shimmer inline-block"
          >
            Enter Universe →
          </Link>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.9 }}
          className={`mt-12 h-px w-32 bg-[var(--color-gold)] opacity-30 origin-${isEven ? 'left' : 'right'}`}
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
    </section>
  );
}
