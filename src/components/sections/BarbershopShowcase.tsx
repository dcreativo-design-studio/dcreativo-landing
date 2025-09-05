'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiPlayCircle,
  FiSmartphone,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiZap
} from 'react-icons/fi';

const BarbershopShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const features = [
    {
      title: "Prenotazioni Online 24/7",
      description: "I clienti prenotano direttamente dall'app, scegliendo servizio, barbiere e orario preferito.",
      image: "/images/barbershop/booking-feature.jpg",
      icon: <FiCalendar className="w-6 h-6" />,
      stats: "+40% prenotazioni"
    },
    {
      title: "Automazioni Intelligenti",
      description: "WhatsApp, SMS ed email automatici per conferme, promemoria e follow-up clienti.",
      image: "/images/barbershop/automation-feature.jpg",
      icon: <FiZap className="w-6 h-6" />,
      stats: "-65% no-show"
    },
    {
      title: "E-Shop Integrato",
      description: "Vendita prodotti direttamente dall'app con gestione magazzino e spedizioni.",
      image: "/images/barbershop/eshop-feature.jpg",
      icon: <FiCreditCard className="w-6 h-6" />,
      stats: "Nuova fonte di ricavi"
    },
    {
      title: "Dashboard Completa",
      description: "Gestione staff, statistiche avanzate, calendario appuntamenti in tempo reale.",
      image: "/images/barbershop/dashboard-feature.jpg",
      icon: <FiTrendingUp className="w-6 h-6" />,
      stats: "Controllo totale"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "CHF 89",
      period: "/mese",
      color: "primary",
      popular: false,
      features: [
        "0-100 prenotazioni/mese",
        "500 email automatiche",
        "100 SMS promemoria",
        "2 barbieri attivi",
        "Dashboard base",
        "Statistiche essenziali"
      ],
      limitations: ["WhatsApp Business API non incluso"]
    },
    {
      name: "Business",
      price: "CHF 149",
      period: "/mese",
      color: "secondary",
      popular: true,
      features: [
        "101-300 prenotazioni/mese",
        "1,500 email automatiche",
        "300 SMS promemoria",
        "5 barbieri attivi",
        "WhatsApp Business API",
        "Dashboard avanzata",
        "Analytics dettagliati"
      ],
      limitations: []
    },
    {
      name: "Premium",
      price: "CHF 249",
      period: "/mese",
      color: "accent",
      popular: false,
      features: [
        "301-1000 prenotazioni/mese",
        "Email illimitate",
        "1,000 SMS promemoria",
        "Barbieri illimitati",
        "WhatsApp Business API",
        "Dashboard completa",
        "Tutti gli analytics"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      price: "CHF 0.25",
      period: "/prenotazione",
      color: "gradient",
      popular: false,
      features: [
        "Oltre 1000 prenotazioni/mese",
        "Tutti i servizi inclusi",
        "Email illimitate",
        "SMS illimitati",
        "Barbieri illimitati",
        "API personalizzate",
        "Integrazioni custom"
      ],
      limitations: []
    }
  ];

  return (
    <section id="barbershop-showcase" className="py-20 bg-gradient-to-br from-dark-900 via-primary-900/10 to-dark-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary-500/20 backdrop-blur-sm text-primary-300 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary-500/30">
            <FiZap className="mr-2" />
            <span>Sistema Completo per Barbershop</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
              Rivoluzione
            </span> del Barbershop
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            PWA completa che trasforma il tuo barbershop in un business automatizzato.
            <strong className="text-primary-400"> Più prenotazioni, meno lavoro, massimi profitti.</strong>
          </p>

          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto mb-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-primary-500/30">
              {!isVideoPlaying ? (
                <motion.div
                  onClick={() => {
                    setIsVideoPlaying(true);
                    setTimeout(() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                      }
                    }, 800);
                  }}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <Image
                    src="/images/barbershop/main-demo.jpg"
                    alt="Demo PWA Barbershop"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all duration-300"
                    >
                      <FiPlayCircle className="w-16 h-16 text-white group-hover:text-primary-300 transition-colors" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-bold mb-1 text-white">Sistema Live in Uso</h3>
                      <p className="text-sm text-gray-300">Guarda come funziona nella realtà</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    controls
                    autoPlay
                    poster="/images/barbershop/main-demo.jpg"
                    className="w-full h-full object-cover"
                    onLoadedData={() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                      }
                    }}
                  >
                    <source src="https://youtu.be/6X0FxjzQfjw" type="video/mp4" />
                    Il tuo browser non supporta i video HTML5.
                  </video>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Features Interactive */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Funzionalità che Fanno la Differenza</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Tabs */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-primary-500/20 border-primary-500/50 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-4 ${
                      activeFeature === index ? 'bg-primary-500' : 'bg-white/20'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{feature.title}</h4>
                      <span className="text-primary-400 text-sm font-medium">{feature.stats}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Feature Preview */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                Live Demo
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Piani di Abbonamento</h3>
            <p className="text-gray-300 text-lg">Scegli il piano perfetto per il tuo barbershop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-secondary-500 bg-secondary-500/10 shadow-lg shadow-secondary-500/20'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                      <FiStar className="w-4 h-4 mr-1" />
                      Consigliato
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="font-bold text-xl mb-2">{plan.name}</h4>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <FiCheck className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, lIndex) => (
                    <li key={lIndex} className="flex items-start opacity-60">
                      <span className="text-red-400 mr-3">✕</span>
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}>
                  Seleziona {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Implementation Cost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-2xl p-8 border border-primary-500/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Implementazione Completa</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />Personalizzazione completa dell'app</li>
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />Homepage con video e foto del barbershop</li>
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />Setup API esterne (WhatsApp, SMS, Email)</li>
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />PWA installabile su tutti i dispositivi</li>
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />Dominio e hosting configurati</li>
                <li className="flex items-center"><FiCheck className="w-5 h-5 text-green-400 mr-3" />Formazione completa del team</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">CHF 3,500</div>
              <div className="text-gray-300 mb-4">Setup unico + piano mensile a scelta</div>
              <Link href="#contact" className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Richiedi Demo
                <FiSmartphone className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <FiTrendingUp />, title: "+40% Prenotazioni", desc: "Disponibilità 24/7" },
            { icon: <FiClock />, title: "-65% No-Show", desc: "Promemoria automatici" },
            { icon: <FiUsers />, title: "ROI in 4-6 mesi", desc: "Investimento che si ripaga" }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 + (0.1 * index) }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="text-primary-400 mb-4 flex justify-center text-3xl">
                {benefit.icon}
              </div>
              <h4 className="font-bold text-xl mb-2">{benefit.title}</h4>
              <p className="text-gray-300">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarbershopShowcase;
