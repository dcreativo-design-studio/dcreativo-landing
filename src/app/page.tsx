'use client';

import LoadingAnimation from '@/components/animations/LoadingAnimation';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import BarbershopShowcase from '@/components/sections/BarbershopShowcase';
import Contact from '@/components/sections/Contact';
import FamilyCenterShowcase from '@/components/sections/FamilyCenterShowcase';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import ROICalculator from '@/components/sections/ROICalculator';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload key images
    const imagesToPreload = [
      '/images/hero/demo-thumbnail.jpg',
      '/images/barbershop/main-demo.jpg',
      '/images/family-center/main-showcase.jpg',
      '/logo/logo.png'
    ];

    const preloadImages = imagesToPreload.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails to load
        img.src = src;
      });
    });

    Promise.all(preloadImages).then(() => {
      // Ensure minimum loading time for smooth UX
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    });
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingAnimation onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && !isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex min-h-screen flex-col"
          >
            <Header />
            
            <Hero />
            
            <BarbershopShowcase />
            
            <FamilyCenterShowcase />
            
            <ROICalculator />
            
            <About />
            
            <Process />
            
            <Contact />
            
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
