'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FiBell, FiCalendar, FiMessageSquare, FiPieChart, FiShield, FiUsers } from 'react-icons/fi';

// Feature card component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 border border-light-300 dark:border-dark-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-dark-600 dark:text-light-400">
        {description}
      </p>
    </motion.div>
  );
};

const Automation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Automation features data
  const features = [
    {
      title: "Notifiche Automatiche",
      description: "Sistema intelligente di notifiche via email, SMS e WhatsApp per comunicare con i tuoi clienti in modo automatico.",
      icon: <FiBell size={24} />
    },
    {
      title: "Prenotazioni Online",
      description: "Sistema di prenotazione intuitivo che funziona 24/7, gestendo automaticamente disponibilità e orari.",
      icon: <FiCalendar size={24} />
    },
    {
      title: "Comunicazione Multicanale",
      description: "Integrazione con email, SMS e WhatsApp per una comunicazione efficace su tutti i canali preferiti dai clienti.",
      icon: <FiMessageSquare size={24} />
    },
    {
      title: "Gestione Utenti",
      description: "Ruoli e permessi personalizzati per amministratori, staff e clienti con dashboard specifiche per ogni utente.",
      icon: <FiUsers size={24} />
    },
    {
      title: "Analytics in Tempo Reale",
      description: "Monitora le performance del tuo business con dashboard interattive e report personalizzati.",
      icon: <FiPieChart size={24} />
    },
    {
      title: "Sicurezza Avanzata",
      description: "Protezione dei dati con crittografia avanzata, autenticazione sicura e conformità alle normative sulla privacy.",
      icon: <FiShield size={24} />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="automation" className="py-20 bg-light-200 dark:bg-dark-900">
      <div className="container-custom" ref={sectionRef}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sistemi <span className="gradient-text">automatizzati</span> intelligenti
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Creo soluzioni che lavorano per te, riducendo il carico manuale e aumentando l'efficienza.
            I miei sistemi automatizzati permettono alla tua attività di funzionare senza interruzioni, 24/7.
          </p>
        </motion.div>

        {/* Main content area with features and illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 border border-light-300 dark:border-dark-500">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/automation-illustration.svg"
                  alt="Sistema di automazione"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Animation elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="absolute top-[20%] right-[10%] bg-white dark:bg-dark-600 p-3 rounded-lg shadow-md border border-light-300 dark:border-dark-500"
              >
                <FiBell className="text-primary-500" size={24} />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-[20%] left-[15%] bg-white dark:bg-dark-600 p-3 rounded-lg shadow-md border border-light-300 dark:border-dark-500"
              >
                <FiMessageSquare className="text-accent-500" size={24} />
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-6"
            >
              Come funziona l'automazione
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-dark-600 dark:text-light-400 mb-8"
            >
              I miei sistemi di automazione sono progettati per semplificare i processi,
              eliminare le attività ripetitive e migliorare l'efficienza operativa.
              Ecco come la tua attività ne può beneficiare:
            </motion.p>

            <motion.ul variants={containerVariants} className="space-y-4">
              <motion.li variants={itemVariants} className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                </div>
                <p className="text-dark-600 dark:text-light-400">
                  <strong>Risparmio di tempo:</strong> Riduzione fino all'80% del tempo dedicato alla gestione manuale degli appuntamenti
                </p>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                </div>
                <p className="text-dark-600 dark:text-light-400">
                  <strong>Meno errori:</strong> Eliminazione degli errori umani nella gestione delle prenotazioni e comunicazioni
                </p>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                </div>
                <p className="text-dark-600 dark:text-light-400">
                  <strong>Più clienti:</strong> Aumento fino al 30% delle prenotazioni grazie alla disponibilità 24/7
                </p>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-start">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                </div>
                <p className="text-dark-600 dark:text-light-400">
                  <strong>Riduzione no-show:</strong> Diminuzione fino all'80% delle mancate presentazioni grazie ai promemoria automatici
                </p>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Automation;
