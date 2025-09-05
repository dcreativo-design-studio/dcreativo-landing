'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FiAward, FiCode, FiHeart, FiZap } from 'react-icons/fi';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const stats = [
    { icon: <FiCode />, value: "5+", label: "Anni di Esperienza", color: "text-primary-500" },
    { icon: <FiZap />, value: "15+", label: "Progetti Completati", color: "text-secondary-500" },
    { icon: <FiAward />, value: "100%", label: "Clienti Soddisfatti", color: "text-accent-500" },
    { icon: <FiHeart />, value: "24/7", label: "Supporto Dedicato", color: "text-green-500" }
  ];

  const values = [
    {
      title: "Risultati Concreti",
      description: "Sistemi che aumentano i tuoi ricavi e riducono i costi operativi.",
      icon: "📈"
    },
    {
      title: "Tecnologie All'Avanguardia",
      description: "Solo le migliori tecnologie per garantire performance.",
      icon: "⚡"
    },
    {
      title: "Automazione Intelligente",
      description: "Sistemi che lavorano per te 24/7, eliminando il lavoro manuale e riducendo gli errori umani.",
      icon: "🤖"
    },
    {
      title: "Supporto Continuo",
      description: "Supporto tecnico, aggiornamenti e ottimizzazioni continue.",
      icon: "🛡️"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container-custom relative z-10" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
  transition={{ duration: 0.6 }}
>
  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
    <FiHeart className="mr-2 w-4 h-4" />
    <span>Chi Siamo</span>
  </div>
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Trasformiamo la Tua Presenza Digitale in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
      clienti reali ogni giorno
    </span>
  </h2>
  <div className="space-y-4 text-lg text-dark-600 dark:text-light-400 mb-8">
    <p>
      <strong className="text-primary-600 dark:text-primary-400">RICCIO DIGITAL</strong> - Web Design & SEO Solutions.
      Progettiamo <strong className="text-primary-600 dark:text-primary-400">soluzioni gestionali personalizzate</strong> per attività locali
      che vogliono modernizzarsi e aumentare la loro visibilità online.
    </p>

    <p>
      Siamo specializzati in <strong>indicizzazione SEO di Google</strong>: ti facciamo comparire nei primi risultati
      delle ricerche Google per portarti <strong>clienti nuovi ogni giorno</strong>. Analizziamo le interazioni
      con il tuo sito e ottimizziamo costantemente le performance.
    </p>

    <p>
      La nostra forza? <strong>Promozione su Google Maps</strong>, gestione completa del profilo della tua attività
      e sistemi intelligenti che automatizzano i processi.
    </p>
  </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                  className="text-center"
                >
                  <div className={`text-2xl ${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500 dark:text-light-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                <FiZap className="mr-2 w-5 h-5" />
                Iniziamo il Tuo Progetto
              </a>

              <a
                href="#barbershop-showcase"
                className="inline-flex items-center justify-center border border-primary-600 text-primary-600 dark:text-primary-400 px-6 py-3 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Guarda i Progetti
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile/developer-profile.jpg"
                  alt="DCreativo - Full Stack Developer"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-primary-500 text-white p-3 rounded-xl shadow-lg"
              >
                <FiCode className="w-6 h-6" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-accent-500 text-white p-3 rounded-xl shadow-lg"
              >
                <FiZap className="w-6 h-6" />
              </motion.div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Disponibile
              </div>
            </div>
          </motion.div>
        </div>

      {/* Values Section */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mt-20"
>
  <div className="text-center mb-12">
    <h3 className="text-2xl md:text-3xl font-bold mb-4">
      Perché Scegliere RICCIO DIGITAL
    </h3>
    <p className="text-dark-600 dark:text-light-400 max-w-2xl mx-auto">
      Il Tuo Partner Strategico per la crescita Digitale della Tua Attività.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {values.map((value, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 + (0.1 * index) }}
        className="bg-light-100 dark:bg-dark-700 rounded-xl p-6 border border-light-300 dark:border-dark-500 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start">
          <div className="text-3xl mr-4 flex-shrink-0">
            {value.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold mb-3">{value.title}</h4>
            <p className="text-dark-600 dark:text-light-400">{value.description}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

{/* Testimonial */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 text-center border border-primary-200 dark:border-primary-700"
>
  <div className="max-w-2xl mx-auto">
    <blockquote className="text-lg italic text-dark-600 dark:text-light-400 mb-6">
      "In due settimane i miei clienti prenotano quasi tutti online. Ho il controllo completo del negozio e con lo shop integrato vendo prodotti generando entrate extra. Risultati concreti, subito."
    </blockquote>
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
        FZ
      </div>
      <div className="text-left">
        <div className="font-bold">Santiago</div>
        <div className="text-sm text-dark-500 dark:text-light-500">F4DE ZØNE LVGA</div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default About;
