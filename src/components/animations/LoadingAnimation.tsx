'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

// Costanti fuori dal componente per evitare re-render
const LOADING_TEXTS = [
  'Inizializzazione sistemi...',
  'Caricamento interfaccia...',
  'Ottimizzazione performance...',
  'Configurazione ambiente...',
  'Finalizzazione setup...',
  'Sistemi pronti!'
];

const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.2,
  },
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    elastic: [0.175, 0.885, 0.32, 1.275] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  }
};

// Componente per le particelle geometriche
const GeometricParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];

    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 16 + 8,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 3,
      initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle',
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
            x: [
              particle.initialX,
              particle.initialX + (Math.random() - 0.5) * 200,
            ],
            y: [
              particle.initialY,
              particle.initialY + (Math.random() - 0.5) * 200,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        >
          {particle.shape === 'circle' && (
            <div className="w-full h-full bg-gradient-to-br from-purple-400/50 to-cyan-400/50 rounded-full blur-sm" />
          )}
          {particle.shape === 'square' && (
            <div className="w-full h-full bg-gradient-to-br from-blue-400/50 to-purple-400/50 rotate-45 blur-sm" />
          )}
          {particle.shape === 'triangle' && (
            <div
              className="w-full h-full bg-gradient-to-br from-cyan-400/50 to-blue-400/50 blur-sm"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Componente per la griglia animata
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <motion.div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPositionX: ['0px', '50px'],
          backgroundPositionY: ['0px', '50px'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Componente per l'effetto di scansione
const ScanEffect = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      style={{
        boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
      }}
      animate={{
        y: ['-100%', '100vh', '-100%']
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2
      }}
    />
  );
};

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();

  // Effetto typewriter per il testo
  useEffect(() => {
    const currentText = LOADING_TEXTS[currentTextIndex];
    let timeout: NodeJS.Timeout;

    const typeWriter = () => {
      if (!isDeleting && charIndex <= currentText.length) {
        setDisplayText(currentText.substring(0, charIndex));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex >= 0) {
        setDisplayText(currentText.substring(0, charIndex));
        setCharIndex(prev => prev - 1);
      }

      if (charIndex === currentText.length && !isDeleting) {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
        setCurrentTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
      }
    };

    timeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, currentTextIndex, isDeleting]);

  // Gestione del progresso
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 2 + 1;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            controls.start({
              scale: 1.1,
              opacity: 0,
              filter: 'blur(8px)',
              transition: {
                duration: ANIMATION_CONFIG.duration.slow,
                ease: ANIMATION_CONFIG.easing.smooth
              }
            }).then(() => {
              setTimeout(onComplete, 300);
            });
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [onComplete, controls]);

  return (
    <motion.div
      animate={controls}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 overflow-hidden"
    >
      {/* Griglia animata di sfondo */}
      <AnimatedGrid />

      {/* Particelle geometriche */}
      <GeometricParticles />

      {/* Effetto di scansione */}
      <ScanEffect />

      {/* Orbs luminosi di sfondo */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Contenuto principale */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Container del logo */}
        <motion.div
          initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
          animate={{
            scale: 1,
            rotateY: 0,
            opacity: 1
          }}
          transition={{
            duration: ANIMATION_CONFIG.duration.slow,
            ease: ANIMATION_CONFIG.easing.elastic,
            delay: 0.3
          }}
          className="mb-10"
        >
          {/* Anello rotante */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-purple-500/30"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.4), transparent)',
              }}
            />

            {/* Logo */}
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                rotateY: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              }}
              className="relative h-32 w-32 mx-auto mb-6 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              <Image
                src="/logo/logo.png"
                alt="RICCIO DIGITAL Logo"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Titolo principale */}
        <div className="text-center mb-10 max-w-5xl">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: ANIMATION_CONFIG.duration.slow,
              delay: 0.8,
              ease: ANIMATION_CONFIG.easing.smooth
            }}
            className="overflow-hidden"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 30%, #06b6d4 60%, #ec4899 90%, #ffffff 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              RICCIO DIGITAL
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: ANIMATION_CONFIG.duration.medium }}
            className="space-y-3"
          >
            <p className="text-slate-300 text-2xl md:text-3xl font-light tracking-wide">
              Sistemi Digital che Aumentano i Profitti
            </p>
            <motion.div
              className="h-1 w-40 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ delay: 1.6, duration: ANIMATION_CONFIG.duration.medium }}
            />
          </motion.div>
        </div>

        {/* Sezione progresso */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: ANIMATION_CONFIG.duration.medium }}
          className="w-full max-w-lg mx-auto space-y-6"
        >
          {/* Barra di progresso principale */}
          <div className="relative h-3 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/40">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.3)'
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Effetto shimmer */}
            <motion.div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '500%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Info di caricamento */}
          <div className="flex justify-between items-center text-base">
            <motion.div
              className="text-slate-400 font-mono flex items-center"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="ml-2 w-1 h-5 bg-purple-400"
              />
            </motion.div>

            <motion.span
              className="text-purple-400 font-bold font-mono text-lg"
              animate={{
                scale: progress > 90 ? [1, 1.2, 1] : 1,
                color: progress > 90 ? '#00ffff' : '#a855f7'
              }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </motion.div>

        {/* Indicatori di stato */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: ANIMATION_CONFIG.duration.medium }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: 'Design', threshold: 30 },
            { label: 'Development', threshold: 60 },
            { label: 'Optimization', threshold: 90 }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center space-x-3"
              animate={{
                color: progress > item.threshold ? '#06b6d4' : '#94a3b8'
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full border-2"
                animate={{
                  borderColor: progress > item.threshold ? '#06b6d4' : '#475569',
                  backgroundColor: progress > item.threshold ? '#06b6d4' : 'transparent',
                  scale: progress > item.threshold ? [1, 1.4, 1] : 1
                }}
                transition={{ duration: 0.4 }}
              />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
