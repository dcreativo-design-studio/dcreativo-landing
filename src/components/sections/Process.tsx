'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FiArrowRight,
    FiCheck,
    FiCode,
    FiCoffee,
    FiLayout,
    FiSettings,
    FiSmile
} from 'react-icons/fi';

// Process step component
interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  isLast?: boolean;
  isInView: boolean;
}

const ProcessStep = ({ icon, title, description, stepNumber, isLast = false, isInView }: ProcessStepProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      {/* Step number and connector line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 * stepNumber }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl"
        >
          {stepNumber}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.8, delay: 0.1 * stepNumber }}
            className="h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 my-2 md:my-4"
          />
        )}
      </div>

      {/* Step content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.1 * stepNumber + 0.2 }}
        className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-light-300 dark:border-dark-500 flex-1 mb-6 md:mb-12"
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
    </div>
  );
};

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Process steps data
  const processSteps = [
    {
      icon: <FiCoffee size={24} />,
      title: "1. Consulenza Iniziale",
      description: "Ci incontriamo (in persona o virtualmente) per discutere del tuo progetto. Ascolto attentamente le tue esigenze, obiettivi e visione per capire esattamente cosa vuoi realizzare."
    },
    {
      icon: <FiLayout size={24} />,
      title: "2. Design e Prototipazione",
      description: "Creo wireframe e prototipi interattivi che permettono di visualizzare l'esperienza utente e l'interfaccia prima di iniziare lo sviluppo. Questo processo iterativo assicura che siamo allineati sulla direzione del progetto."
    },
    {
      icon: <FiCode size={24} />,
      title: "3. Sviluppo",
      description: "Utilizzo le tecnologie più adatte al tuo progetto per costruire una soluzione robusta e scalabile. Durante questa fase, ti tengo costantemente aggiornato sui progressi con demo regolari."
    },
    {
      icon: <FiSettings size={24} />,
      title: "4. Implementazione Automazioni",
      description: "Integro sistemi automatizzati che rendono la tua applicazione intelligente: notifiche automatiche, elaborazione dati in background, integrazioni con servizi esterni e molto altro."
    },
    {
      icon: <FiCheck size={24} />,
      title: "5. Test e Ottimizzazione",
      description: "Testo rigorosamente ogni aspetto dell'applicazione per garantire qualità e prestazioni ottimali. Eseguo ottimizzazioni per velocità, accessibilità e compatibilità con diversi dispositivi."
    },
    {
      icon: <FiSmile size={24} />,
      title: "6. Lancio e Supporto",
      description: "Dopo il deploy dell'applicazione, offro supporto continuo, formazione per il tuo team e aggiornamenti periodici per mantenere la soluzione sempre funzionante e sicura."
    }
  ];

  // Heading animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="process" className="py-20">
      <div className="container-custom" ref={sectionRef}>
        {/* Section heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Il mio <span className="gradient-text">processo</span> di lavoro
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Seguo un processo ben definito che garantisce risultati eccezionali e un'esperienza fluida.
            Ogni fase è progettata per massimizzare l'efficienza e la qualità del prodotto finale.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={index + 1}
              isLast={index === processSteps.length - 1}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Iniziamo il tuo progetto</span>
            <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
