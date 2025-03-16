'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FiCode, FiDatabase, FiLayers, FiLayout, FiServer, FiSettings } from 'react-icons/fi';

// Skill Card Component
interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
  delay: number;
}

const SkillCard = ({ title, icon, description, skills, delay }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
  };

  const skillVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: 0.3 + delay + (i * 0.1) }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-light-300 dark:border-dark-500"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <p className="text-dark-600 dark:text-light-400 mb-6">{description}</p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            custom={index}
            variants={skillVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="px-3 py-1 bg-light-300 dark:bg-dark-600 rounded-full text-sm text-dark-700 dark:text-light-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px 0px" });

  // Skill categories data
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FiLayout size={24} />,
      description: "Creo interfacce moderne, responsive e altamente interattive con le più recenti tecnologie frontend.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Backend Development",
      icon: <FiServer size={24} />,
      description: "Sviluppo backend robusti, sicuri e scalabili per supportare applicazioni complesse.",
      skills: ["Node.js", "Express", "RESTful API", "GraphQL", "JWT", "Autenticazione", "Sicurezza"]
    },
    {
      title: "Database",
      icon: <FiDatabase size={24} />,
      description: "Gestisco dati in modo efficiente con diversi tipi di database, sia relazionali che non relazionali.",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "ORM", "Modeling"]
    },
    {
      title: "Sviluppo APP",
      icon: <FiCode size={24} />,
      description: "Creo applicazioni mobile e web multipiattaforma con architetture moderne e performanti.",
      skills: ["React Native", "Progressive Web Apps", "App Development", "Cross-platform", "Responsive"]
    },
    {
      title: "Automazioni",
      icon: <FiSettings size={24} />,
      description: "Costruisco sistemi automatizzati che lavorano per te, riducendo il carico manuale e aumentando l'efficienza.",
      skills: ["Notifiche", "Workflow", "SMS/Email", "Cron Jobs", "Integrazioni API", "Webhooks"]
    },
    {
      title: "DevOps & Deployment",
      icon: <FiLayers size={24} />,
      description: "Implemento CI/CD e gestisco l'infrastruttura cloud per un deployment robusto e scalabile.",
      skills: ["Vercel", "Docker", "GitHub Actions", "CI/CD", "AWS", "Cloud Services", "Monitoraggio"]
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
    <section id="skills" className="py-20 bg-light-200 dark:bg-dark-900">
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
              Le mie <span className="gradient-text">competenze</span> tecniche
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Utilizzo le tecnologie più all'avanguardia per creare soluzioni web
            innovative, performanti e facili da usare. Il mio approccio combina
            solide basi tecniche con un'attenzione particolare all'esperienza utente.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              description={category.description}
              skills={category.skills}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Tech stack showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-white dark:bg-dark-700 rounded-xl shadow-lg p-8 border border-light-300 dark:border-dark-500"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Il mio stack tecnologico</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            {/* React */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/react.svg" alt="React" fill className="object-contain" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">React</span>
            </div>

            {/* Next.js */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/nextjs.svg" alt="Next.js" fill className="object-contain dark:invert" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">Next.js</span>
            </div>

            {/* Node.js */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/nodejs.svg" alt="Node.js" fill className="object-contain" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">Node.js</span>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/typescript.svg" alt="TypeScript" fill className="object-contain" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">TypeScript</span>
            </div>

            {/* MongoDB */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/mongodb.svg" alt="MongoDB" fill className="object-contain" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">MongoDB</span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/images/tech/tailwindcss.svg" alt="Tailwind CSS" fill className="object-contain" />
              </div>
              <span className="text-sm text-dark-600 dark:text-light-400">Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
