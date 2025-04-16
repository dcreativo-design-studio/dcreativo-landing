'use client';

import emailjs from '@emailjs/browser';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiCheck, FiMail } from 'react-icons/fi';
import styles from './UnsubscribeForm.module.css';

// EmailJS configuration
const SERVICE_ID = 'service_y0iefgs';
const TEMPLATE_ADMIN_ID = 'template_e5osggk';
const PUBLIC_KEY = 'YsuwIKayg5yIbGYk0';

interface FormState {
  user_email: string;
  unsubscribe_date: string;
  admin_email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.2
    }
  }
};

// Loading spinner animation for button
const loadingVariants: Variants = {
  start: { rotate: 0 },
  end: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};

const UnsubscribeForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    user_email: '',
    unsubscribe_date: '',
    admin_email: 'info@dcreativo.ch', // Default admin email
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  });

  // Set current date on component mount
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setFormState(prev => ({ ...prev, unsubscribe_date: formattedDate }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      // Clear error when user starts typing again
      ...(name === 'user_email' && prev.isError ? { isError: false, errorMessage: '' } : {})
    }));
  };

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formState.user_email)) {
      setFormState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Per favore, inserisci un indirizzo email valido'
      }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, isError: false }));

    try {
      // Format date for display in email (e.g., April 16, 2025)
      const displayDate = new Date(formState.unsubscribe_date).toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Send email ONLY to admin, not to the user
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ADMIN_ID,
        {
          email: formState.admin_email, // This matches the {{email}} in recipient field
          user_email: formState.user_email, // User's email for the content
          unsubscribe_date: displayDate,
          admin_email: formState.admin_email,
          from_name: 'DCreativo Unsubscribe System',
          reply_to: 'noreply@dcreativo.ch'
        },
        PUBLIC_KEY
      );

      // Success state
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        user_email: '' // Clear the form
      }));
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isError: true,
        errorMessage: 'Impossibile elaborare la richiesta. Per favore, riprova più tardi.'
      }));
    }
  };

  return (
    <div className={styles.unsubscribeContainer}>
      <motion.div
        className={styles.unsubscribeCard}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
      >
        <motion.div
          className={styles.unsubscribeHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <motion.img
            src="/logo/dcreativo-logo.svg"
            alt="DCreativo Logo"
            className={styles.unsubscribeLogo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Annulla iscrizione alla newsletter
          </motion.h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {formState.isSuccess ? (
            <motion.div
              className={styles.successMessage}
              key="success"
              initial="hidden"
              animate="visible"
              variants={successVariants}
            >
              <motion.div
                className={styles.successIcon}
                variants={iconVariants}
              >
                <FiCheck size={40} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Annullamento iscrizione riuscito
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p>Il tuo indirizzo email è stato rimosso con successo dalla nostra mailing list.</p>
                <p>Non riceverai più email promozionali da DCreativo.</p>
              </motion.div>

              <motion.a
                href="https://dcreativo.ch"
                className={styles.homeButton}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(41, 128, 185, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Ritorna alla home page
              </motion.a>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className={styles.unsubscribeForm}
              key="form"
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <motion.p
                className={styles.formDescription}
                variants={itemVariants}
              >
                Inserisci il tuo indirizzo email per annullare l'iscrizione alle nostre email promozionali.
              </motion.p>

              <AnimatePresence>
                {formState.isError && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={styles.errorInner}>
                      <FiAlertTriangle className={styles.errorIcon} />
                      {formState.errorMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="user_email">Indirizzo e-mail</label>
                <div className={styles.inputWrapper}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formState.user_email}
                    onChange={handleChange}
                    placeholder="Il tuo indirizzo e-mail"
                    className={formState.isError ? styles.inputError : ''}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="unsubscribe_date">Data di annullamento dell'iscrizione</label>
                <input
                  type="date"
                  id="unsubscribe_date"
                  name="unsubscribe_date"
                  value={formState.unsubscribe_date}
                  onChange={handleChange}
                  readOnly
                />
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={formState.isSubmitting}
                variants={itemVariants}
                whileHover={!formState.isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!formState.isSubmitting ? { scale: 0.98 } : {}}
              >
                {formState.isSubmitting ? (
                  <div className={styles.loadingWrapper}>
                    <motion.div
                      className={styles.loadingSpinner}
                      variants={loadingVariants}
                      initial="start"
                      animate="end"
                    />
                    <span>Elaborazione in corso...</span>
                  </div>
                ) : (
                  'Annulla iscrizione'
                )}
              </motion.button>

              <motion.p
                className={styles.privacyNote}
                variants={itemVariants}
              >
                La tua privacy è importante per noi. Elaboreremo questa richiesta immediatamente.
              </motion.p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UnsubscribeForm;
