/**
 * Auraloom — Footer Component
 * Minimal luxury footer with brand, links, and social icons.
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl tracking-[0.15em] text-[var(--color-text-primary)] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              AURALOOM
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] tracking-wider">
              Weaving Emotions into Art
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 leading-relaxed max-w-xs">
              Handcrafted with love, each piece tells a story. From flowers to canvas, bookmarks to bespoke creations.
            </p>
          </div>

          {/* Universes */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Universes
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/collections/karosiya-flowers', label: 'Karosiya Flowers' },
                { to: '/collections/canvas-paintings', label: 'Canvas Paintings' },
                { to: '/collections/bookmarks', label: 'Bookmarks' },
                { to: '/collections/wall-paintings', label: 'Wall Paintings' },
                { to: '/collections/custom-made', label: 'Custom Made' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@auraloom.com" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors duration-300">
                  hello@auraloom.com
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors duration-300">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)] tracking-wider">
            © {new Date().getFullYear()} Auraloom. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] tracking-wider">
            Handcrafted with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
