'use client';

import TypingText from '@/components/animations/TypingText';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const moveX = (mouseX - 0.5) * 30;
      const moveY = (mouseY - 0.5) * 30;

      const elements = heroRef.current.querySelectorAll('.parallax-element');

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = parseFloat(htmlEl.dataset.speed || '1');
        const offsetX = moveX * speed;
        const offsetY = moveY * speed;

        htmlEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="hero" className="pt-32 pb-20 overflow-hidden relative" ref={heroRef}>
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Gradient blob 1 */}
        <div
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-300/10 blur-3xl parallax-element animate-blob"
          data-speed="1.5"
        ></div>

        {/* Gradient blob 2 */}
        <div
          className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-secondary-400/15 to-accent-500/10 blur-3xl parallax-element animate-blob animation-delay-2000"
          data-speed="2"
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center mb-6">
              <div className="h-1 w-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded"></div>
              <span className="ml-3 text-lg font-medium text-dark-600 dark:text-light-300">Freelancer & Developer</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Sviluppo <span className="gradient-text">soluzioni web</span> all'avanguardia
            </h1>

            <div className="text-xl md:text-2xl text-dark-500 dark:text-light-400 font-medium mb-8 min-h-[4rem]">
              <TypingText
                texts={[
                  "Applicazioni React avanzate.",
                  "Sistemi di prenotazione automatizzati.",
                  "Integrazioni con notifiche intelligenti.",
                  "Esperienze digitali su misura."
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                delayBetweenTexts={2000}
              />
            </div>

            <p className="text-dark-600 dark:text-light-400 mb-8 text-lg">
              Trasformo le tue idee in realtà digitali, con un'attenzione maniacale
              ai dettagli e alle prestazioni. Creo applicazioni web che funzionano da sole,
              automatizzando i processi e migliorando l'esperienza degli utenti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="btn-primary">
                <span>Parliamo del tuo progetto</span>
                <FiArrowRight className="ml-2" />
              </Link>

              <Link href="#process" className="btn-secondary">
                <span>Scopri il mio processo</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[600px] mx-auto">
              {/* Main hero image */}
              <div className="relative z-20 rounded-2xl overflow-hidden shadow-xl border border-light-400 dark:border-dark-600">
                <Image
                  src="/images/hero-dashboard.webp"
                  alt="Dashboard di un'applicazione web moderna"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-[10%] right-[-5%] z-30 parallax-element"
                data-speed="-0.5"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="p-4 bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-light-300 dark:border-dark-500">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Sistema Online</span>
                  </div>
                  <div className="text-xs text-dark-500 dark:text-light-400">
                    Notifiche automatizzate attive
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[10%] left-[-10%] z-30 parallax-element"
                data-speed="-0.7"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="p-4 bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-light-300 dark:border-dark-500">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">React + Next.js</span>
                  </div>
                  <div className="text-xs text-dark-500 dark:text-light-400">
                    Performance ottimizzate
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[40%] right-[5%] z-30 parallax-element"
                data-speed="-0.9"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="p-4 bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-light-300 dark:border-dark-500">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">UI/UX Design</span>
                  </div>
                  <div className="text-xs text-dark-500 dark:text-light-400">
                    Esperienze interattive
                  </div>
                </div>
              </motion.div>

              {/* Code snippets in background */}
              <div className="absolute top-[25%] left-[-15%] z-10 parallax-element opacity-20 dark:opacity-30" data-speed="-0.3">
                <pre className="text-xs text-dark-700 dark:text-light-300 font-mono rotate-[-10deg]">
{`import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AutomatedSystem = () => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Initialize automation
    startAutomation();

    return () => stopAutomation();
  }, []);

  // ...
}`}
                </pre>
              </div>

              <div className="absolute bottom-[15%] right-[-10%] z-10 parallax-element opacity-20 dark:opacity-30" data-speed="-0.2">
                <pre className="text-xs text-dark-700 dark:text-light-300 font-mono rotate-[5deg]">
{`// Automated notification system
async function sendNotifications(users, template) {
  for (const user of users) {
    await Promise.all([
      sendEmail(user.email, template),
      sendSMS(user.phone, template),
      user.whatsapp && sendWhatsApp(user.phone, template)
    ]);

    updateUserStatus(user.id, 'notified');
  }

  return { success: true };
}`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-light-300 dark:border-dark-500"
          >
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">20+</h3>
            <p className="text-center text-dark-600 dark:text-light-400">Progetti completati</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-light-300 dark:border-dark-500"
          >
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">5+</h3>
            <p className="text-center text-dark-600 dark:text-light-400">Anni di esperienza</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-light-300 dark:border-dark-500"
          >
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</h3>
            <p className="text-center text-dark-600 dark:text-light-400">Clienti soddisfatti</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-light-300 dark:border-dark-500"
          >
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">∞</h3>
            <p className="text-center text-dark-600 dark:text-light-400">Possibilità creative</p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-dark-600 dark:text-light-400 text-sm mb-2">Scorri per scoprire</span>
            <div className="w-6 h-10 border-2 border-dark-400 dark:border-light-400 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-2 h-2 bg-dark-600 dark:bg-light-300 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
