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
  FiHeart,
  FiHome,
  FiPlayCircle,
  FiShield,
  FiUsers,
  FiZap
} from 'react-icons/fi';

const FamilyCenterShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [activeDemo, setActiveDemo] = useState<'registration' | 'booking' | 'payment' | 'admin'>('registration');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const centerFeatures = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Iscrizioni Bambini Semplificate",
      description: "I genitori registrano i propri figli online con tutti i dati necessari: allergie, intolleranze, contatti di emergenza.",
      image: "/images/family-center/registration.jpg",
      stats: "Riduzione 90% tempo amministrativo"
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Prenotazione Mensa & Doposcuola",
      description: "Sistema automatico per prenotare mensa entro le 9:00 e doposcuola prima dell'inizio attività.",
      image: "/images/family-center/booking.jpg",
      stats: "Gestione automatica scadenze"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Check-in/Check-out Digitale",
      description: "Monitoraggio in tempo reale di arrivi e partenze. Sicurezza e trasparenza totali per i genitori.",
      image: "/images/family-center/checkin.jpg",
      stats: "Sicurezza garantita 100%"
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Pagamenti Online Automatici",
      description: "Fatturazione digitale, pagamenti sicuri, prezzi trasparenti. Zero contanti da gestire.",
      image: "/images/family-center/payments.jpg",
      stats: "100% pagamenti digitalizzati"
    },
    {
      icon: <FiHome className="w-8 h-8" />,
      title: "Noleggio Sala Automatizzato",
      description: "Sistema indipendente per prenotazioni sala, calendario in tempo reale, SEO per nuovi clienti.",
      image: "/images/family-center/hall-rental.jpg",
      stats: "Nuova fonte di ricavi"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Dashboard Amministrativa Completa",
      description: "Gestione centralizzata di iscrizioni, pagamenti, presenze, comunicazioni. Tutto in un unico posto.",
      image: "/images/family-center/admin-dashboard.jpg",
      stats: "Controllo operativo totale"
    }
  ];

  const demos = {
    registration: {
      title: "Registrazione Bambini",
      description: "I genitori compilano profili completi online con tutti i dati necessari",
      image: "/images/family-center/demo-registration.jpg",
      features: ["Dati anagrafici completi", "Allergie e intolleranze", "Contatti di emergenza", "Documentazione medica", "Autorizzazioni automatiche"]
    },
    booking: {
      title: "Prenotazione Servizi",
      description: "Mensa e doposcuola prenotabili fino all'ultimo momento utile",
      image: "/images/family-center/demo-booking.jpg",
      features: ["Calendario intelligente", "Scadenze automatiche", "Conferme istantanee", "Pagamenti integrati", "Notifiche promemoria"]
    },
    payment: {
      title: "Gestione Pagamenti",
      description: "Sistema completo per fatturazione e pagamenti digitali",
      image: "/images/family-center/demo-payments.jpg",
      features: ["Fatturazione automatica", "Pagamenti online sicuri", "Prezzi trasparenti", "Storico completo", "Ricevute digitali"]
    },
    admin: {
      title: "Dashboard Amministrativa",
      description: "Controllo completo di tutte le operazioni quotidiane",
      image: "/images/family-center/demo-admin.jpg",
      features: ["Presenze in tempo reale", "Gestione iscrizioni", "Report finanziari", "Comunicazioni automatiche", "Analytics dettagliati"]
    }
  };

  const benefits = [
    {
      title: "Tempo Risparmiato",
      value: "15+ ore/settimana",
      description: "Eliminate le procedure manuali",
      color: "text-blue-400"
    },
    {
      title: "Riduzione Errori",
      value: "95%",
      description: "Niente più dimenticanze",
      color: "text-green-400"
    },
    {
      title: "Soddisfazione Genitori",
      value: "Massima",
      description: "Trasparenza totale",
      color: "text-purple-400"
    },
    {
      title: "ROI Investimento",
      value: "4-6 mesi",
      description: "Si ripaga velocemente",
      color: "text-primary-400"
    }
  ];

  return (
    <section id="family-center-showcase" className="py-20 bg-gradient-to-br from-light-50 to-primary-50 dark:from-dark-900 dark:to-primary-900/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
      </div>

      <div className="container-custom relative z-10" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <FiHeart className="mr-2" />
            <span>Sistema per Centri Famiglia & Educativi</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Gestionale <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
              Multi-Servizi
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-dark-600 dark:text-light-400 max-w-3xl mx-auto mb-8">
            Sistema completo per centri che gestiscono mensa, doposcuola, noleggio sale e molto altro.
            <strong className="text-primary-600 dark:text-primary-400"> Automazione totale, genitori felici.</strong>
          </p>

          {/* Main Demo Video */}
          /* Main Demo Video */
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="relative max-w-5xl mx-auto mb-12"
>
  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-light-300 dark:border-dark-500">
    {!isVideoPlaying ? (
      <motion.div
        onClick={() => {
          setIsVideoPlaying(true);
        }}
        className="relative w-full h-full cursor-pointer group"
      >
        <Image
          src="/images/family-center/main-showcase.jpg"
          alt="Demo Sistema Gestionale Multi-Servizi"
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all duration-300"
          >
            <FiPlayCircle className="w-16 h-16 text-white group-hover:text-primary-300 transition-colors" />
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-bold mb-1 text-white">Sistema Completo Funzionante</h3>
            <p className="text-sm text-gray-300">Demo live del gestionale multi-servizi</p>
          </div>
        </div>

        {/* Floating Trust Badge */}
        <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm animate-pulse">
          🚀 DEMO PRONTA
        </div>
     </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(100% at 50% 50%)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-full"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/x6Uj61KACJE?autoplay=1&rel=0&modestbranding=1"
            title="Demo Sistema Gestionale Centro Famiglie"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    )}
  </div>
</motion.div>
        </motion.div>

        {/* Interactive Demo Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Esplora il Sistema</h3>
            <p className="text-dark-600 dark:text-light-400">Clicca sui tab per vedere come funziona ogni modulo</p>
          </div>

          {/* Demo Navigation */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="inline-flex bg-white dark:bg-dark-700 rounded-xl p-1 shadow-lg border border-light-300 dark:border-dark-500 min-w-max">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key as typeof activeDemo)}
                  className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeDemo === key
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-dark-600 dark:text-light-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h4 className="text-2xl font-bold mb-4">{demos[activeDemo].title}</h4>
              <p className="text-dark-600 dark:text-light-400 text-lg mb-6">{demos[activeDemo].description}</p>

              <div className="space-y-3 mb-8">
                {demos[activeDemo].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center"
                  >
                    <FiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-light-300 dark:border-dark-500">
                <Image
                  src={demos[activeDemo].image}
                  alt={demos[activeDemo].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Demo Badge */}
              <div className="absolute -top-3 -right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                Demo Live
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Funzionalità Complete</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="text-primary-500 mr-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                </div>
                <p className="text-dark-600 dark:text-light-400 mb-4">{feature.description}</p>
                <div className="bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Stats */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Benefici Concreti</h3>
            <p className="text-dark-600 dark:text-light-400">Risultati misurabili fin dal primo mese</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-light-300 dark:border-dark-500"
              >
                <h4 className="font-bold text-dark-700 dark:text-light-300 mb-2">{benefit.title}</h4>
                <div className={`text-3xl font-bold ${benefit.color} mb-2`}>{benefit.value}</div>
                <p className="text-sm text-dark-500 dark:text-light-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto per Trasformare il Tuo Centro?
            </h3>

            <p className="text-xl mb-8 opacity-90">
              Sistema completo, demo funzionante, implementazione rapida.
              <strong> Inizia oggi la digitalizzazione del tuo centro.</strong>
            </p>

            {/* Value Proposition */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold mb-2">Sistema Pronto</h4>
                <p className="text-sm opacity-80">Demo completamente funzionante</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold mb-2">Implementazione Veloce</h4>
                <p className="text-sm opacity-80">Operativo in 2-4 settimane</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold mb-2">Supporto Completo</h4>
                <p className="text-sm opacity-80">Formazione e assistenza inclusi.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-light-100 transition-colors duration-200 flex items-center justify-center"
              >
                <FiZap className="mr-2" />
                <span>Richiedi Demo Personalizzata</span>
              </Link>

             {/* <button className="bg-white/10 backdrop-blur-sm border border-white/20 font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-colors duration-200 flex items-center justify-center">
                <FiPlayCircle className="mr-2" />
                <span>Guarda la Demo Live</span>
              </button> */}
            </div>

            {/* Trust indicators */}
            <div className="mt-8 text-sm opacity-80">
              <p>✅ Sistema testato • ✅ Demo funzionante • ✅ Implementazione garantita</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FamilyCenterShowcase;
