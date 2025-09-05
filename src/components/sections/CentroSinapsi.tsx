'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiHeart,
  FiHome,
  FiShield,
  FiStar,
  FiUsers
} from 'react-icons/fi';

const CentroSinapsi = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [activeDemo, setActiveDemo] = useState<'registration' | 'booking' | 'admin'>('registration');

  // Funzionalità principali per Centro Sinapsi
  const features = [
    {
      icon: <FiUsers className="w-8 h-8 text-primary-500" />,
      title: "Iscrizioni Online Semplificate",
      description: "I genitori registrano i bambini in pochi click, creando profili completi con allergie, intolleranze e informazioni mediche.",
      stats: "Riduzione 90% tempo iscrizioni"
    },
    {
      icon: <FiCalendar className="w-8 h-8 text-secondary-500" />,
      title: "Prenotazione Mensa & Doposcuola",
      description: "Iscrizione mensa entro le 9:00, doposcuola prima dell'inizio. Sistema automatico con scadenze chiare.",
      stats: "Fino all'ultimo momento"
    },
    {
      icon: <FiClock className="w-8 h-8 text-accent-500" />,
      title: "Check-in/Check-out Digitale",
      description: "Monitoraggio in tempo reale di arrivi e partenze. I genitori sanno sempre dove sono i loro figli.",
      stats: "Sicurezza garantita 24/7"
    },
    {
      icon: <FiCreditCard className="w-8 h-8 text-green-500" />,
      title: "Pagamenti Online Automatici",
      description: "Fatturazione digitale, pagamenti sicuri, prezzi trasparenti. Niente più contanti o assegni da gestire.",
      stats: "100% pagamenti digitalizzati"
    },
    {
      icon: <FiShield className="w-8 h-8 text-blue-500" />,
      title: "Portale Amministrativo",
      description: "Dashboard completa per gestire iscrizioni, pagamenti, presenze. Notifiche automatiche per tutto.",
      stats: "Controllo totale operazioni"
    },
    {
      icon: <FiHome className="w-8 h-8 text-purple-500" />,
      title: "Noleggio Sala Automatizzato",
      description: "Prenotazioni sala online, calendario in tempo reale, SEO per nuovi clienti. Sistema completamente autonomo.",
      stats: "Nuove entrate automatiche"
    }
  ];

  // Benefici per il Centro Sinapsi
  const benefits = [
    {
      title: "Risparmio di Tempo",
      value: "15+ ore/settimana",
      description: "Eliminate le procedure manuali",
      color: "text-blue-600"
    },
    {
      title: "Riduzione Errori",
      value: "95%",
      description: "Niente più dimenticanze o errori di trascrizione",
      color: "text-green-600"
    },
    {
      title: "Soddisfazione Genitori",
      value: "Massima",
      description: "Controllo e trasparenza totali",
      color: "text-purple-600"
    },
    {
      title: "ROI Investimento",
      value: "4-6 mesi",
      description: "Il sistema si ripaga velocemente",
      color: "text-primary-600"
    }
  ];

  const demos = {
    registration: {
      title: "Registrazione Bambini",
      description: "I genitori creano profili completi in pochi minuti",
      image: "/images/projects/screen-7.webp",
      features: ["Dati anagrafici", "Allergie e intolleranze", "Contatti emergenza", "Documentazione medica"]
    },
    booking: {
      title: "Prenotazione Servizi",
      description: "Mensa e doposcuola prenotabili fino all'ultimo momento utile",
      image: "/images/projects/screen-6.webp",
      features: ["Calendario smart", "Scadenze automatiche", "Conferme istantanee", "Pagamenti integrati"]
    },
    admin: {
      title: "Dashboard Amministrativa",
      description: "Controllo totale delle operazioni quotidiane",
      image: "/images/projects/barbershop-dashboard.jpg",
      features: ["Presenze real-time", "Fatturazione automatica", "Report dettagliati", "Notifiche smart"]
    }
  };

  return (
    <section id="centro-sinapsi" className="py-20 bg-gradient-to-br from-light-50 to-primary-50 dark:from-dark-900 dark:to-primary-900/10" ref={sectionRef}>
      <div className="container-custom">
        {/* Header con focus su Centro Sinapsi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <FiStar className="mr-2" />
            <span>Soluzione Speciale per Centri Educativi</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Centro Famiglie</span> - Il Futuro della Gestione Educativa
          </h2>

          <p className="text-xl text-dark-600 dark:text-light-400 max-w-3xl mx-auto">
            Un sistema completo per digitalizzare mensa, doposcuola e noleggio sala.
            <strong className="text-primary-600 dark:text-primary-400"> Pronto per la customizzazione.</strong>
          </p>
        </motion.div>

        {/* Hero Video/Screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-20"
        >
          <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-light-300 dark:border-dark-500">
            <Image
              src="/images/projects/screen-12.webp"
              alt="Sistema completo Centro Sinapsi - Dashboard principale"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />

            {/* Overlay informativo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Sistema Completo e Funzionante</h3>
                <p className="text-lg mb-4">Demo live del sistema per centri educativi</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    ✅ Gestione Bambini
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    ✅ Mensa Automatica
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    ✅ Pagamenti Online
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    ✅ Noleggio Sala
                  </div>
                </div>
              </div>
            </div>

            {/* Badge "PRONTO ORA" */}
            <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm animate-pulse">
              🚀 SISTEMA PRONTO
            </div>
          </div>
        </motion.div>

        {/* Demo interattiva */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Esplora il Sistema in Azione</h3>
            <p className="text-dark-600 dark:text-light-400">Clicca sui tab per vedere come funziona ogni parte del sistema</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-light-200 dark:bg-dark-700 rounded-xl p-1">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key as typeof activeDemo)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeDemo === key
                      ? 'bg-white dark:bg-dark-600 text-primary-600 shadow-md'
                      : 'text-dark-600 dark:text-light-400 hover:text-primary-600'
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
                  <div key={index} className="flex items-center">
                    <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center btn-primary"
              >
                <span>Avvia il Progetto Ora</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-light-300 dark:border-dark-500">
                <Image
                  src="/images/projects/screen-8.webp"
                  alt={demos[activeDemo].title}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating indicator */}
              <div className="absolute -top-3 -right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                Demo Live
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
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

        {/* Features Showcase */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Funzionalità Complete</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h4 className="font-bold text-lg ml-3">{feature.title}</h4>
                </div>
                <p className="text-dark-600 dark:text-light-400 mb-4">{feature.description}</p>
                <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing e Urgenza */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Inizia Subito
            </h3>

            <p className="text-xl mb-8 opacity-90">
              Il sistema è pronto. La demo funziona perfettamente.
              Bastano poche settimane per l'implementazione..
            </p>

            {/* Prezzo e ROI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">Investimento</h4>
                <div className="text-3xl font-bold">CHF 11'500</div>
                <p className="text-sm opacity-80">Sistema completo</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">ROI Completo</h4>
                <div className="text-3xl font-bold">4-6 mesi</div>
                <p className="text-sm opacity-80">Basato su analisi</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">Risparmio Annuo</h4>
                <div className="text-3xl font-bold">CHF 12'000+</div>
                <p className="text-sm opacity-80">Solo in tempo</p>
              </div>
            </div>

            {/* Urgency
            <div className="bg-accent-500 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <FiZap className="w-6 h-6 mr-2" />
                <span className="font-bold">Offerta Limitata - Solo per Centro Sinapsi</span>
              </div>
              <p className="text-sm opacity-90">
                Implementazione prioritaria se confermi entro fine mese.
                Include formazione completa e supporto per 6 mesi.
              </p>
            </div>*/}

            {/* CTA principale */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-light-100 transition-colors duration-200 flex items-center justify-center"
              >
                <FiHeart className="mr-2" />
                <span> Vuoi scoprire come funziona?
                </span>
              </Link>

                {/* <button className="bg-white/10 backdrop-blur-sm border border-white/20 font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-colors duration-200 flex items-center justify-center">
                <FiPlayCircle className="mr-2" />
                <span>Guarda la Demo Live</span>
              </button>*/}
            </div>

            {/* Trust builder finale */}
            <div className="mt-8 text-sm opacity-80">
              <p>
                ✅ Sistema già sviluppato • ✅ Demo funzionante • ✅ Supporto garantito • ✅ ROI documentato
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonianza specifica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white dark:bg-dark-700 rounded-xl p-8 shadow-xl border border-light-300 dark:border-dark-500 max-w-3xl mx-auto text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              CS
            </div>
            <h4 className="font-bold text-xl">Centro per Famiglie</h4>
            <p className="text-dark-500 dark:text-light-400">Il tuo partner per l'innovazione educativa</p>
          </div>

          <blockquote className="text-lg italic text-dark-600 dark:text-light-400 mb-6">
            "Questo sistema trasformerà completamente la gestione del nostro centro.
            Finalmente avremo tutto digitalizzato: iscrizioni, mensa, doposcuola, noleggio sala.
            I genitori saranno felicissimi della trasparenza e comodità."
          </blockquote>

          <div className="bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-4 py-2 rounded-full text-sm font-medium inline-block">
            Pronto per partire insieme 🚀
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CentroSinapsi;
