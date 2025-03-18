'use client';

import emailjs from '@emailjs/browser';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertTriangle, FiCheck, FiMail, FiMapPin, FiPhone, FiSend, FiX } from 'react-icons/fi';

// Contact form data type
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Form status state
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showNotification, setShowNotification] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("Cf4kj_2duT6ja95NU");
  }, []);

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    try {
      setFormStatus('submitting');

      // Send email to you (the site owner)
      await emailjs.send(
        'service_yp90bx9',
        'template_nc5pmjt',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      // Send confirmation email to the user
      await emailjs.send(
        'service_yp90bx9',
        'template_svp6kxf',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
        }
      );

      setFormStatus('success');
      setShowNotification(true);
      reset();

      // Hide notification after 10 seconds
      setTimeout(() => {
        setShowNotification(false);
        // Reset form status after notification is hidden
        setTimeout(() => {
          setFormStatus('idle');
        }, 500);
      }, 10000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setShowNotification(true);

      // Hide error notification after 8 seconds
      setTimeout(() => {
        setShowNotification(false);
        // Reset form status after notification is hidden
        setTimeout(() => {
          setFormStatus('idle');
        }, 500);
      }, 8000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-200 dark:bg-dark-900 relative">
      {/* Notification overlay */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-20 inset-x-0 z-50 flex justify-center items-start px-4"
          >
            <div className={`
              max-w-md w-full p-6 rounded-xl shadow-2xl border relative
              ${formStatus === 'success'
                ? 'bg-white dark:bg-dark-700 border-green-300 dark:border-green-700'
                : 'bg-white dark:bg-dark-700 border-red-300 dark:border-red-700'}
            `}>
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-4 right-4 text-dark-400 dark:text-light-500 hover:text-dark-600 dark:hover:text-light-300 transition-colors"
                aria-label="Chiudi notifica"
              >
                <FiX size={20} />
              </button>

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <FiCheck className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Messaggio inviato con successo!</h3>
                  <p className="text-dark-600 dark:text-light-400 mb-4">
                    Grazie per averci contattato! Ti abbiamo inviato una conferma via email e ti risponderemo al più presto.
                  </p>
                  <div className="flex space-x-3 mt-2">
                    <a
                      href="https://dcreativo.ch"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Esplora il sito
                    </a>
                    <span className="text-dark-400 dark:text-light-600">•</span>
                    <a
                      href="https://barbershop.dcreativo.ch"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Vedi progetti
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <FiAlertTriangle className="text-red-600 dark:text-red-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Si è verificato un errore</h3>
                  <p className="text-dark-600 dark:text-light-400 mb-4">
                    Non è stato possibile inviare il messaggio. Riprova più tardi o contattami direttamente via email o telefono.
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="mailto:info@dcreativo.ch"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      info@dcreativo.ch
                    </a>
                    <a
                      href="tel:+41767810194"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      +41 76 781 01 94
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Parliamo del tuo <span className="gradient-text">progetto</span>
            </h2>
          </div>
          <p className="text-dark-600 dark:text-light-400 text-lg">
            Hai un'idea per un progetto o vuoi semplicemente saperne di più sui miei servizi?
            Contattami e discutiamo di come posso aiutarti a realizzare la tua visione.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-8 border border-light-300 dark:border-dark-500 h-full">
              <h3 className="text-2xl font-bold mb-6">Informazioni di contatto</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:info@dcreativo.ch" className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      info@dcreativo.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Telefono</h4>
                    <a href="tel:+41767810194" className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      +41 76 781 01 94
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                <div className="mt-1 p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Sede</h4>
                    <p className="text-dark-600 dark:text-light-400">
                      Osogna, Svizzera
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4">Orari di disponibilità</h4>
                <div className="space-y-2">
                  <p className="text-dark-600 dark:text-light-400 flex justify-between">
                    <span>Lunedì - Venerdì:</span>
                    <span>9:00 - 18:00</span>
                  </p>
                  <p className="text-dark-600 dark:text-light-400 flex justify-between">
                    <span>Sabato:</span>
                    <span>10:00 - 15:00</span>
                  </p>
                  <p className="text-dark-600 dark:text-light-400 flex justify-between">
                    <span>Domenica:</span>
                    <span>Chiuso</span>
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4">Seguimi</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/dcreativo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300 p-3 rounded-full hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 496 512"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                    </svg>
                  </a>

                  <a
                    href="https://linkedin.com/in/dcreativo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300 p-3 rounded-full hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com/dcreativo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-light-300 dark:bg-dark-600 text-dark-600 dark:text-light-300 p-3 rounded-full hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-8 border border-light-300 dark:border-dark-500">
              <h3 className="text-2xl font-bold mb-6">Inviami un messaggio</h3>

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.name ? 'border-red-500' : 'border-light-400 dark:border-dark-500'
                      } bg-light-100 dark:bg-dark-600 px-4 py-2 text-dark-800 dark:text-light-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                      placeholder="Es. Mario Rossi"
                      {...register('name', { required: 'Il nome è obbligatorio' })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-light-400 dark:border-dark-500'
                      } bg-light-100 dark:bg-dark-600 px-4 py-2 text-dark-800 dark:text-light-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                      placeholder="Es. mario.rossi@email.com"
                      {...register('email', {
                        required: 'L\'email è obbligatoria',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Indirizzo email non valido'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                    Oggetto <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full rounded-md border ${
                      errors.subject ? 'border-red-500' : 'border-light-400 dark:border-dark-500'
                    } bg-light-100 dark:bg-dark-600 px-4 py-2 text-dark-800 dark:text-light-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    placeholder="Es. Richiesta informazioni"
                    {...register('subject', { required: 'L\'oggetto è obbligatorio' })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-light-300 mb-1">
                    Messaggio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full rounded-md border ${
                      errors.message ? 'border-red-500' : 'border-light-400 dark:border-dark-500'
                    } bg-light-100 dark:bg-dark-600 px-4 py-2 text-dark-800 dark:text-light-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    placeholder="Descrivi brevemente il tuo progetto o la tua richiesta..."
                    {...register('message', {
                      required: 'Il messaggio è obbligatorio',
                      minLength: {
                        value: 20,
                        message: 'Il messaggio deve contenere almeno 20 caratteri'
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-primary-700 disabled:bg-primary-400 transition-colors flex items-center justify-center"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Invia messaggio
                    </>
                  )}
                </button>


              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
