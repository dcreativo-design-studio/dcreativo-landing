'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { HiOutlineBell, HiOutlineCalendar, HiOutlineClock, HiOutlineSparkles, HiOutlineUserGroup } from 'react-icons/hi';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [activeSlide, setActiveSlide] = useState(0);

  // Elementi da evidenziare per il BarberShopSystem
  const featureSlides = [
    {
      title: "Prenotazione Intuitiva",
      description: "Un'interfaccia user-friendly permette ai clienti di prenotare in pochi click, selezionando servizio, barbiere e orario preferito.",
      image: "/images/projects/barbershop-booking.jpg",
      icon: <HiOutlineCalendar className="w-10 h-10 text-primary-500" />,
      stats: "Riduzione del 70% nel tempo di prenotazione"
    },
    {
      title: "Notifiche Automatiche",
      description: "Sistema di promemoria automatici via SMS o email che riduce i no-show e mantiene i clienti informati sul loro appuntamento.",
      image: "/images/projects/barbershop-notifications.jpg",
      icon: <HiOutlineBell className="w-10 h-10 text-primary-500" />,
      stats: "Riduzione del 65% nei no-show"
    },
    {
      title: "Dashboard in Tempo Reale",
      description: "Pannello di controllo che offre una panoramica completa dell'attività giornaliera, delle prenotazioni e delle statistiche.",
      image: "/images/projects/barbershop-dashboard.jpg",
      icon: <HiOutlineSparkles className="w-10 h-10 text-primary-500" />,
      stats: "Gestione semplificata delle operazioni quotidiane"
    },
    {
      title: "Gestione Clienti",
      description: "Database clienti completo che memorizza preferenze, storico appuntamenti e note personali per un servizio personalizzato.",
      image: "/images/projects/barbershop-customers.jpg",
      icon: <HiOutlineUserGroup className="w-10 h-10 text-primary-500" />,
      stats: "Esperienza cliente migliorata con personalizzazione"
    },
    {
      title: "Ottimizzazione Tempo",
      description: "Algoritmi intelligenti che ottimizzano la pianificazione degli appuntamenti, massimizzando l'efficienza del barbiere.",
      image: "/images/projects/barbershop-optimization.jpg",
      icon: <HiOutlineClock className="w-10 h-10 text-primary-500" />,
      stats: "Aumento del 30% nell'efficienza operativa"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === featureSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? featureSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section id="projects" className="py-20 bg-light-100 dark:bg-dark-800">
      <div className="container-custom" ref={sectionRef}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Il mio <span className="gradient-text">progetto</span> di punta
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Scopri BarberShopSystem, un'applicazione completa che sta rivoluzionando la gestione di un salone a Lugano.
            Un sistema su misura che automatizza prenotazioni, gestisce clienti e ottimizza l'operatività quotidiana.
          </p>
        </motion.div>

        {/* Showcase principale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 mb-16">
          {/* Descrizione del progetto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">BarberShopSystem</h3>
            <p className="text-dark-600 dark:text-light-400 mb-6">
              Un'applicazione web completa sviluppata per modernizzare e automatizzare la gestione di un barbershop a Lugano.
              Il sistema integra prenotazioni online, gestione clienti, notifiche automatiche e reportistica avanzata in un'unica soluzione.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full mr-4">
                  <HiOutlineSparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium">Automazione completa</h4>
                  <p className="text-sm text-dark-500 dark:text-light-500">Riduzione del 80% nel lavoro manuale</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full mr-4">
                  <HiOutlineBell className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium">Notifiche intelligenti</h4>
                  <p className="text-sm text-dark-500 dark:text-light-500">65% meno appuntamenti mancati</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full mr-4">
                  <HiOutlineUserGroup className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium">Esperienza cliente migliorata</h4>
                  <p className="text-sm text-dark-500 dark:text-light-500">Incremento della fidelizzazione</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-sm font-medium bg-light-300 dark:bg-dark-600 text-dark-700 dark:text-light-300 px-3 py-1 rounded-full">React</span>
              <span className="text-sm font-medium bg-light-300 dark:bg-dark-600 text-dark-700 dark:text-light-300 px-3 py-1 rounded-full">Next.js</span>
              <span className="text-sm font-medium bg-light-300 dark:bg-dark-600 text-dark-700 dark:text-light-300 px-3 py-1 rounded-full">MongoDB</span>
              <span className="text-sm font-medium bg-light-300 dark:bg-dark-600 text-dark-700 dark:text-light-300 px-3 py-1 rounded-full">Automazioni</span>
              <span className="text-sm font-medium bg-light-300 dark:bg-dark-600 text-dark-700 dark:text-light-300 px-3 py-1 rounded-full">Twilio API</span>
            </div>

            <a
              href="https://yourstyle.dcreativo.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center btn-primary self-start"
            >
              Visita il progetto
              <FiExternalLink className="ml-2" size={18} />
            </a>
          </motion.div>

          {/* Immagine principale */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-light-300 dark:border-dark-500">
              <Image
                src="/images/projects/barbershop-main.jpg"
                alt="BarberShopSystem Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">Dashboard Proprietario</h3>
                <p className="text-white/80 text-sm">Visione completa dell'attività in tempo reale</p>
              </div>
            </div>

            {/* Badge animato */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-accent-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-10"
            >
              <span className="text-sm font-bold">In Uso Attivo</span>
              <div className="ml-2 h-2 w-2 rounded-full bg-white animate-pulse"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Carousel */}
        <div className="relative mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">Funzionalità principali</h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Controlli */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white dark:bg-dark-700 shadow-lg p-3 rounded-full text-dark-800 dark:text-light-200 hover:bg-light-200 dark:hover:bg-dark-600 transition-colors duration-200"
              aria-label="Funzionalità precedente"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="overflow-hidden px-4">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {featureSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white dark:bg-dark-700 rounded-xl shadow-xl overflow-hidden border border-light-300 dark:border-dark-500">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Immagine */}
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-center"
                          />
                        </div>

                        {/* Contenuto */}
                        <div className="p-8 flex flex-col">
                          <div className="mb-4">
                            {slide.icon}
                          </div>
                          <h4 className="text-xl font-bold mb-3">{slide.title}</h4>
                          <p className="text-dark-600 dark:text-light-400 mb-6">{slide.description}</p>
                          <div className="mt-auto">
                            <div className="bg-light-200 dark:bg-dark-600 px-4 py-2 rounded-lg inline-block">
                              <p className="text-primary-700 dark:text-primary-300 font-medium">{slide.stats}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white dark:bg-dark-700 shadow-lg p-3 rounded-full text-dark-800 dark:text-light-200 hover:bg-light-200 dark:hover:bg-dark-600 transition-colors duration-200"
              aria-label="Funzionalità successiva"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          {/* Indicatori */}
          <div className="flex justify-center mt-8 gap-2">
            {featureSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? 'bg-primary-600 w-8'
                    : 'bg-light-400 dark:bg-dark-500 hover:bg-light-500 dark:hover:bg-dark-400'
                }`}
                aria-label={`Vai alla caratteristica ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Testimonianza Cliente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-white dark:bg-dark-700 rounded-xl p-8 shadow-xl border border-light-300 dark:border-dark-500 max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <div className="h-20 w-20 rounded-full bg-light-200 dark:bg-dark-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">BB</span>
              </div>
            </div>
            <div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-dark-600 dark:text-light-400 italic mb-4">
                "Ancora nessuna recensione. In attesa di un feedback sull'utilizzo dell'applicazione "BarberShopSystem", dopo un mese di utilizzo da parte del proprietario del BarberShop "Your Style", in uso attivo."
              </blockquote>
              <div>
                <h4 className="font-bold">Barbershop Your Style, Lugano</h4>
                <p className="text-sm text-dark-500 dark:text-light-500">Cliente attivo</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <p className="text-dark-600 dark:text-light-400 mb-6">
            Interessato a una soluzione simile per la tua attività?
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center"
          >
            Parliamo del tuo progetto
            <FiChevronRight className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
