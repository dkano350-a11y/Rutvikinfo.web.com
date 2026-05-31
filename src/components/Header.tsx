import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setIsMotionPaused(localStorage.getItem('reduceMotion') === 'true');
    const handleToggle = () => setIsMotionPaused(localStorage.getItem('reduceMotion') === 'true');
    window.addEventListener('toggle-background-animation', handleToggle);
    return () => window.removeEventListener('toggle-background-animation', handleToggle);
  }, []);

  const toggleMotion = () => {
    window.dispatchEvent(new CustomEvent('toggle-background-animation'));
  };

  const scrollTo = (id: string) => {
    const sectionId = id.replace('#', '');
    if (lenis) {
      lenis.scrollTo(id === '#hero' ? 0 : `#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel transition-butter border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="text-2xl font-serif font-bold text-navy">
            Rutvik D.
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-bold text-charcoal hover:text-electric transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="p-2 -mr-2 text-navy hover:text-electric transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-center text-center mt-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-serif font-bold text-navy hover:text-electric transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
