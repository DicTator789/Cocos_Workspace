/**
 * Auraloom — Navbar Component
 * Sticky navigation with transparent-to-solid transition on scroll.
 * Features brand name, nav links, and cart icon with item count badge.
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleDrawer } = useCart();
  const location = useLocation();

  // Track scroll position for background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <Link to="/" className="flex flex-col items-start group">
              <span
                className="text-2xl tracking-[0.15em] text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                AURALOOM
              </span>
              <span
                className="text-[0.55rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] -mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Weaving Emotions into Art
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/collections/karosiya-flowers">Flowers</NavLink>
              <NavLink to="/collections/canvas-paintings">Canvas</NavLink>
              <NavLink to="/collections/bookmarks">Bookmarks</NavLink>
              <NavLink to="/collections/wall-paintings">Wall Art</NavLink>
              <NavLink to="/collections/custom-made">Custom</NavLink>
            </div>

            {/* Cart + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => toggleDrawer(true)}
                className="relative p-2 text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors duration-300"
                aria-label="Open cart"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] text-[var(--color-text-inverse)] text-[0.65rem] font-semibold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-[var(--color-text-primary)]"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)]/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              <MobileNavLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/collections/karosiya-flowers" onClick={() => setMobileOpen(false)}>Karosiya Flowers</MobileNavLink>
              <MobileNavLink to="/collections/canvas-paintings" onClick={() => setMobileOpen(false)}>Canvas Paintings</MobileNavLink>
              <MobileNavLink to="/collections/bookmarks" onClick={() => setMobileOpen(false)}>Bookmarks</MobileNavLink>
              <MobileNavLink to="/collections/wall-paintings" onClick={() => setMobileOpen(false)}>Wall Paintings</MobileNavLink>
              <MobileNavLink to="/collections/custom-made" onClick={() => setMobileOpen(false)}>Custom Made</MobileNavLink>
              <MobileNavLink to="/cart" onClick={() => setMobileOpen(false)}>Cart ({totalItems})</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Desktop Nav Link ────────────────────────────────────
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-[0.75rem] tracking-[0.15em] uppercase transition-colors duration-300 ${
        isActive
          ? 'text-[var(--color-gold)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]'
      }`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {children}
    </Link>
  );
}

// ── Mobile Nav Link ─────────────────────────────────────
function MobileNavLink({ to, onClick, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className="text-2xl tracking-[0.2em] uppercase text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors duration-300"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
