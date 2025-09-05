'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section id="process" className="py-20 bg-white dark:bg-dark-800" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Come Funziona: <span className="gradient-text">Semplice e Diretto</span>
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg max-w-2xl mx-auto">
            Da idea a sistema funzionante in poche settimane. Niente complicazioni, solo risultati.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            {/* Desktop Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                  <h3 className="text-xl font-bold mb-3">Parliamo</h3>
                  <p className="text-dark-600 dark:text-light-400 mb-4">20 minuti per capire le tue esigenze e mostrarti come il sistema risolve i tuoi problemi</p>
                  <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                    1 giorno
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                  <h3 className="text-xl font-bold mb-3">Personalizziamo</h3>
                  <p className="text-dark-600 dark:text-light-400 mb-4">Adatto il sistema alle tue specifiche necessità: brand, funzionalità, workflow</p>
                  <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                    2-4 settimane
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                  <h3 className="text-xl font-bold mb-3">Lanciamo</h3>
                  <p className="text-dark-600 dark:text-light-400 mb-4">Il tuo sistema è online, funzionante e i clienti iniziano a prenotare automaticamente</p>
                  <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                    1 settimana
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="block md:hidden space-y-8">
            {/* Mobile Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.0 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="w-0.5 h-16 bg-gradient-to-b from-primary-500 to-secondary-500 mt-4"></div>
              </div>
              <div className="flex-1 bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                <h3 className="text-xl font-bold mb-3">Parliamo</h3>
                <p className="text-dark-600 dark:text-light-400 mb-4">20 minuti per capire le tue esigenze e mostrarti come il sistema risolve i tuoi problemi</p>
                <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                  1 giorno
                </div>
              </div>
            </motion.div>

            {/* Mobile Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="w-0.5 h-16 bg-gradient-to-b from-primary-500 to-secondary-500 mt-4"></div>
              </div>
              <div className="flex-1 bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                <h3 className="text-xl font-bold mb-3">Personalizziamo</h3>
                <p className="text-dark-600 dark:text-light-400 mb-4">Adatto il sistema alle tue specifiche necessità: brand, funzionalità, workflow</p>
                <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                  2-4 settimane
                </div>
              </div>
            </motion.div>

            {/* Mobile Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500">
                <h3 className="text-xl font-bold mb-3">Lanciamo</h3>
                <p className="text-dark-600 dark:text-light-400 mb-4">Il tuo sistema è online, funzionante e i clienti iniziano a prenotare automaticamente</p>
                <div className="bg-light-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 inline-block">
                  1 settimana
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Total Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Tempo Totale: 3-5 Settimane</h3>
            <p className="text-dark-600 dark:text-light-400 mb-6">
              Dalla prima chiamata al sistema completamente operativo.
              <strong className="text-primary-600 dark:text-primary-400"> Il tuo investimento inizia a ripagarsi immediatamente.</strong>
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">0</div>
                <div className="text-sm text-dark-500 dark:text-light-400">Rischi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-dark-500 dark:text-light-400">Personalizzato</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">∞</div>
                <div className="text-sm text-dark-500 dark:text-light-400">Supporto</div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center btn-primary"
            >
              <span>Iniziamo Oggi</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Value propositions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Value Prop 1 */}
          <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">Garanzia Risultati</h4>
            <p className="text-sm text-dark-600 dark:text-light-400">Se il sistema non funziona come promesso, rimborso completo</p>
          </div>

          {/* Value Prop 2 */}
          <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">Supporto Incluso</h4>
            <p className="text-sm text-dark-600 dark:text-light-400">6 mesi di supporto tecnico e aggiornamenti gratuiti</p>
          </div>

          {/* Value Prop 3 */}
          <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg border border-light-300 dark:border-dark-500 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <h4 className="font-bold mb-2">Risultati Immediati</h4>
            <p className="text-sm text-dark-600 dark:text-light-400">I primi benefici si vedono dal giorno del lancio</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
