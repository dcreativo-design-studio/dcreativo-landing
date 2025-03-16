'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';

// Project card component
interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  delay: number;
}

const ProjectCard = ({ title, description, image, tags, link, delay }: ProjectProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden h-full flex flex-col border border-light-300 dark:border-dark-500"
    >
      {/* Project image */}
      <div className="relative overflow-hidden h-60">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-white/90 dark:bg-dark-800/90 text-dark-800 dark:text-light-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link button (if provided) */}
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0, y: 20 } : { opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`Visita ${title}`}
          >
            <FiExternalLink size={20} />
          </motion.a>
        )}
      </div>

      {/* Project info */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-dark-600 dark:text-light-400 mb-4 flex-grow">{description}</p>

        {/* View project link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Vedi progetto
            <FiExternalLink className="ml-2" size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // State for project filtering
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Project categories for filtering
  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'web', label: 'Web App' },
    { id: 'booking', label: 'Prenotazioni' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  // Projects data
  const projects = [
    {
      title: "Sistema di Prenotazioni per Barber Shop",
      description: "Applicazione web completa per la gestione degli appuntamenti di un barbiere, con notifiche automatiche e dashboard amministrativa.",
      image: "/images/projects/barbershop.jpg",
      tags: ["React", "Next.js", "MongoDB", "Automazioni"],
      category: "booking",
      link: "https://barbershop.dcreativo.ch"
    },
    {
      title: "E-commerce Personalizzato",
      description: "Piattaforma e-commerce con gestione inventario, carrello avanzato e integrazione con sistemi di pagamento.",
      image: "/images/projects/ecommerce.jpg",
      tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
      category: "ecommerce"
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interattiva per visualizzare e analizzare dati aziendali in tempo reale con grafici personalizzati.",
      image: "/images/projects/dashboard.jpg",
      tags: ["React", "D3.js", "Firebase", "Real-time"],
      category: "dashboard"
    },
    {
      title: "Portale Prenotazioni per Ristorante",
      description: "Sistema di prenotazione tavoli per ristoranti con gestione posti, menu e notifiche automatiche.",
      image: "/images/projects/restaurant.jpg",
      tags: ["Next.js", "MongoDB", "Twilio", "Responsive"],
      category: "booking"
    },
    {
      title: "Web App per Palestra",
      description: "Applicazione web per la gestione di una palestra, con prenotazione corsi, abbonamenti e area clienti.",
      image: "/images/projects/fitness.jpg",
      tags: ["React", "Node.js", "Express", "JWT"],
      category: "web"
    },
    {
      title: "Dashboard IoT",
      description: "Interfaccia di controllo per dispositivi IoT con monitoraggio in tempo reale e analisi dei dati.",
      image: "/images/projects/iot.jpg",
      tags: ["React", "WebSockets", "Chart.js", "API"],
      category: "dashboard"
    }
  ];

  // Filtered projects based on active category
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Scroll functions for mobile view
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20">
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
              I miei <span className="gradient-text">progetti</span> recenti
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Esplora alcuni dei progetti che ho realizzato per clienti in vari settori.
            Ogni progetto è stato sviluppato con attenzione ai dettagli e alle specifiche esigenze del cliente.
          </p>
        </motion.div>

        {/* Categories filter */}
        <div className="relative mb-12">
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-white dark:bg-dark-700 shadow-md text-dark-600 dark:text-light-300 z-10"
              aria-label="Scorri a sinistra"
            >
              <FiChevronLeft size={20} />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex space-x-2 md:justify-center overflow-x-auto pb-2 px-10 md:px-0 no-scrollbar"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300 hover:bg-light-400 dark:hover:bg-dark-500'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="md:hidden absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-white dark:bg-dark-700 shadow-md text-dark-600 dark:text-light-300 z-10"
              aria-label="Scorri a destra"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Empty state if no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-600 dark:text-light-400 text-lg">
              Nessun progetto trovato in questa categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
