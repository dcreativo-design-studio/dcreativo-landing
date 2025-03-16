'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-light-100 dark:bg-dark-800 border-t border-light-400 dark:border-dark-600 pt-16 pb-8">
      <div className="container-custom">
        {/* Upper footer with logo and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and tagline */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/logo/dcreativo-logo.svg"
                  alt="DCreativo Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">DCreativo</span>
            </Link>
            <p className="text-dark-600 dark:text-light-400 mb-4">
              Soluzioni web all'avanguardia con automazioni intelligenti per la tua attività.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/dcreativo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/dcreativo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:info@dcreativo.ch"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Chi Sono
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Competenze
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Processo di Lavoro
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Progetti
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Servizi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#skills"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sviluppo Web
                </Link>
              </li>
              <li>
                <Link
                  href="#automation"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sistemi Automatizzati
                </Link>
              </li>
              <li>
                <Link
                  href="#automation"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Gestione Prenotazioni
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="mt-1 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@dcreativo.ch"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@dcreativo.ch
                </a>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+41767810194"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  +41 76 781 01 94
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="mt-4 inline-block font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Invia un messaggio →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            aria-label="Torna in cima"
          >
            <FiArrowUp size={24} />
          </motion.button>
        </div>

        {/* Bottom footer with copyright and links */}
        <div className="border-t border-light-400 dark:border-dark-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-dark-600 dark:text-light-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} DCreativo. Tutti i diritti riservati.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link
              href="/privacy"
              className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Termini di Servizio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
