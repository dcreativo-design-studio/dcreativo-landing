'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FiArrowDown, FiArrowRight, FiPlayCircle, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = async () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      try {
        // Aspetta che il video sia caricato prima di fare play
        await videoRef.current.play();
      } catch (error) {
        console.log('Errore riproduzione video:', error);
      }
    }
  };

  const achievements = [
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      value: "+40%",
      label: "Aumento Prenotazioni",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      value: "-65%",
      label: "Riduzione No-Show",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      value: "4-6 mesi",
      label: "ROI Garantito",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const benefits = [
    { initial: 'Z', text: 'Zero telefonate per prenotazioni', color: 'from-emerald-500 to-teal-500' },
    { initial: 'P', text: 'Pagamenti automatici integrati', color: 'from-blue-500 to-cyan-500' },
    { initial: 'N', text: 'Notifiche WhatsApp/SMS automatiche', color: 'from-purple-500 to-violet-500' },
    { initial: 'D', text: 'Dashboard di controllo completa', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-primary-900/20 to-dark-800 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-secondary-500/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container-custom relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center bg-primary-500/20 backdrop-blur-sm text-primary-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-primary-500/30"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span>Sistemi Digital che Aumentano i Profitti</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block">Trasforma il tuo</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 block">
                Business
              </span>
              <span className="block">con l'Automazione</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl lg:max-w-none xl:max-w-2xl"
            >
              <p className="mb-4">
                <strong className="text-white">PWA e sistemi automatizzati</strong> che lavorano 24/7 per te.
              </p>
              <p className="text-lg">
                Più prenotazioni, meno lavoro manuale, profitti massimizzati.
              </p>
            </motion.div>

            {/* Key Benefits - Improved Desktop Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (0.1 * index) }}
                    className="flex items-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white font-bold text-lg lg:text-xl mr-4 flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300`}>
                      {benefit.initial}
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm lg:text-base">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="#barbershop-showcase"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-4 px-8 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-primary-500/25 hover:scale-105"
              >
                <FiZap className="mr-2 group-hover:animate-pulse" />
                <span>Guarda i Sistemi Live</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#roi-calculator"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <span>Calcola il tuo ROI</span>
              </Link>
            </motion.div>

            {/* Stats - Enhanced for Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-3 lg:gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + (0.1 * index) }}
                  className="text-center p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <div className={`inline-flex p-2 lg:p-3 rounded-lg mb-2 bg-gradient-to-r ${achievement.color}`}>
                    {achievement.icon}
                  </div>
                  <div className="text-xl lg:text-2xl font-bold mb-1">{achievement.value}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Demo Section - Enhanced for Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative lg:ml-8"
          >
            {/* Main Demo Container */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-primary-500/30">
                {!isVideoPlaying ? (
                  // Video Thumbnail
                  <div className="relative w-full h-full cursor-pointer group" onClick={handleVideoPlay}>
                    <Image
                      src="/images/hero/demo-thumbnail.jpg"
                      alt="Demo Sistema PWA"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 lg:p-8 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <FiPlayCircle className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                      </div>
                    </div>

                    {/* Demo Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 lg:p-6">
                        <h3 className="font-bold text-white mb-1 text-lg lg:text-xl">Sistema Live</h3>
                        <p className="text-sm lg:text-base text-gray-300">Barbershop Lugano</p>
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs lg:text-sm text-green-400">Attivo Ora</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Video Player
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    controls
                    autoPlay
                    poster="/images/hero/demo-thumbnail.jpg"
                    className="w-full h-full object-cover"
                    onLoadedData={() => {
                      // Auto-play quando il video è caricato
                      if (videoRef.current && isVideoPlaying) {
                        videoRef.current.play();
                      }
                    }}
                  >
                    <source src="/videos/hero-demo.mp4" type="video/mp4" />
                    Il tuo browser non supporta i video HTML5.
                  </video>
                )}
              </div>

              {/* Floating Stats - Enhanced for Desktop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 lg:-top-6 -left-4 lg:-left-6 bg-green-500 text-white p-3 lg:p-4 rounded-xl shadow-lg"
              >
                <div className="text-xs lg:text-sm font-bold">+40%</div>
                <div className="text-xs lg:text-sm">Prenotazioni</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 lg:-bottom-6 -right-4 lg:-right-6 bg-blue-500 text-white p-3 lg:p-4 rounded-xl shadow-lg"
              >
                <div className="text-xs lg:text-sm font-bold">-65%</div>
                <div className="text-xs lg:text-sm">No-Show</div>
              </motion.div>

              {/* Success Badge */}
              <div className="absolute -top-2 -right-2 bg-accent-500 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-bold animate-pulse">
                🚀 LIVE
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-3xl -z-10 scale-110"></div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-sm text-gray-400 mb-2">Scopri i Progetti</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiArrowDown className="w-6 h-6 text-primary-400 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-sm text-gray-400"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span>Già utilizzato da attività in Svizzera</span>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
