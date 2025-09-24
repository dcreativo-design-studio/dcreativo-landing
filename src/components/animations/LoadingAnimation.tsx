'use client';

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

// Configurazioni di animazione
const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  verySlow: 2.4
} as const;

const EASING = {
  spring: { type: "spring" as const, damping: 15, stiffness: 100 },
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const
};

// Particelle geometriche fluttuanti
const GeometricParticles = () => {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle',
    initialX: Math.random() * windowSize.width,
    initialY: Math.random() * windowSize.height,
  }));

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
              Math.random() * windowSize.width,
              Math.random() * windowSize.width,
            ],
            y: [
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
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
            <div className="w-full h-full bg-gradient-to-br from-purple-400/60 to-cyan-400/60 rounded-full blur-[1px]" />
          )}
          {particle.shape === 'square' && (
            <div className="w-full h-full bg-gradient-to-br from-blue-400/60 to-purple-400/60 rotate-45 blur-[1px]" />
          )}
          {particle.shape === 'triangle' && (
            <div
              className="w-full h-full bg-gradient-to-br from-cyan-400/60 to-blue-400/60 blur-[1px]"
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

// Effetto di griglia animata di sfondo
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <motion.div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPositionX: ['0px', '40px'],
          backgroundPositionY: ['0px', '40px'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Effetto di scansione laser
const ScanEffect = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
      style={{
        boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff',
      }}
      animate={{
        y: ['-100%', '100vh']
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1
      }}
    />
  );
};


const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'init' | 'loading' | 'complete'>('init');
  const [displayText, setDisplayText] = useState('');
  const controls = useAnimation();

  const progressValue = useMotionValue(0);
  const scaleProgress = useTransform(progressValue, [0, 100], [0.8, 1.2]);

  const texts = [
    'Inizializzazione sistemi...',
    'Caricamento interfaccia...',
    'Ottimizzazione performance...',
    'Configurazione ambiente...',
    'Finalizzazione setup...',
    'Sistemi pronti!'
  ];

  // Effetto di typing per il testo
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const typeWriter = () => {
      const currentText = texts[currentTextIndex];

      if (!isDeleting && currentCharIndex <= currentText.length) {
        setDisplayText(currentText.substring(0, currentCharIndex));
        currentCharIndex++;
      } else if (isDeleting && currentCharIndex >= 0) {
        setDisplayText(currentText.substring(0, currentCharIndex));
        currentCharIndex--;
      }

      if (currentCharIndex === currentText.length && !isDeleting) {
        timeout = setTimeout(() => { isDeleting = true; }, 1500);
      } else if (currentCharIndex === 0 && isDeleting) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
      }

      timeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
    };

    typeWriter();
    return () => clearTimeout(timeout);
  }, [texts]);

  // Gestione del progresso di caricamento
  useEffect(() => {
    setPhase('loading');

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1;
        const newProgress = Math.min(prev + increment, 100);
        progressValue.set(newProgress);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setPhase('complete');
          setTimeout(() => {
            controls.start({
              scale: 1.1,
              opacity: 0,
              filter: 'blur(10px)',
              transition: { duration: DURATION.slow, ease: EASING.smooth }
            }).then(() => {
              setTimeout(onComplete, 200);
            });
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete, controls, progressValue]);

  return (
    <motion.div
      animate={controls}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 overflow-hidden"
    >
      {/* Griglia animata di sfondo */}
      <AnimatedGrid />

      {/* Particelle geometriche */}
      <GeometricParticles />

      {/* Effetto di scansione */}
      <ScanEffect />

      {/* Orbs di sfondo migliorati */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Contenuto principale */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">

        {/* Logo container migliorato */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{
            scale: phase === 'init' ? 0 : 1,
            rotateY: phase === 'init' ? -180 : 0
          }}
          transition={{
            duration: DURATION.slow,
            ease: EASING.elastic,
            delay: 0.2
          }}
          className="mb-8"
        >
          {/* Anello rotante attorno al logo */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border-2 border-purple-500/50"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.5), transparent)',
              }}
            />

            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: phase === 'complete' ? [1, 1.2, 1] : 1
              }}
              transition={{
                rotateY: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { duration: DURATION.medium }
              }}
              className="relative h-28 w-28 mx-auto mb-6 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <Image
                src="/logo/logo.png"
                alt="RICCIO DIGITAL Logo"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Titolo con effetto di reveal */}
        <div className="text-center mb-8 max-w-4xl">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: DURATION.slow, delay: 0.6, ease: EASING.smooth }}
            className="overflow-hidden"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-4 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 25%, #06b6d4 50%, #ec4899 75%, #ffffff 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              RICCIO DIGITAL
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: DURATION.medium }}
            className="space-y-2"
          >
            <p className="text-slate-300 text-xl md:text-2xl font-light">
              Sistemi Digital che Aumentano i Profitti
            </p>
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 1.3, duration: DURATION.medium }}
            />
          </motion.div>
        </div>

        {/* Barra di progresso avanzata */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: DURATION.medium }}
          className="w-full max-w-md mx-auto space-y-4"
        >
          {/* Contenitore della barra di progresso */}
          <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Effetto di scintillio sulla barra */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{
                x: ['-100%', '400%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Informazioni di caricamento */}
          <div className="flex justify-between items-center text-sm">
            <motion.span
              className="text-slate-400 font-mono"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1"
              >
                |
              </motion.span>
            </motion.span>

            <motion.span
              className="text-purple-400 font-bold font-mono"
              animate={{ scale: scaleProgress }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </motion.div>

        {/* Indicatori di stato */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: DURATION.medium }}
          className="mt-8 flex space-x-4"
        >
          {['Design', 'Development', 'Optimization'].map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center space-x-2 text-slate-400"
              animate={{
                color: progress > (index + 1) * 33 ? '#06b6d4' : '#94a3b8'
              }}
              transition={{ duration: DURATION.fast }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor: progress > (index + 1) * 33 ? '#06b6d4' : '#475569',
                  scale: progress > (index + 1) * 33 ? [1, 1.5, 1] : 1
                }}
                transition={{ duration: DURATION.fast }}
              />
              <span className="text-xs font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
