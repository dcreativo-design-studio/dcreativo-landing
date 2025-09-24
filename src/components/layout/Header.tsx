'use client';

import { useTheme } from '@/components/layout/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { label: 'Chi Siamo', href: '#about' },
    { label: 'Demo Barbershop', href: '#barbershop-showcase' },
    { label: 'Demo Gestionale', href: '#family-center-showcase' },
    { label: 'Calcolatore ROI', href: '#roi-calculator' },
    { label: 'Processo', href: '#process' },
    { label: 'Contatti', href: '#contact' },
  ];

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-light-100/90 dark:bg-dark-800/90 backdrop-blur-md shadow-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 mr-3">
            <Image
              src="/logo/logo.png"
              alt="DCreativo Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <span className="text-xl font-display font-bold gradient-text">riccio digital</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300 hover:bg-light-400 dark:hover:bg-dark-500 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="ml-4 btn-primary"
          >
            Richiedi Demo Live
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="mr-2 p-2 rounded-full bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-light-100 dark:bg-dark-800 border-t border-light-400 dark:border-dark-600"
          >
            <nav className="container-custom py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-light-300 dark:hover:bg-dark-600 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 mt-2 btn-primary text-center"
              >
                Richiedi Demo Live
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
