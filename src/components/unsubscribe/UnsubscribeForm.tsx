'use client';

import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from 'react';
import styles from './UnsubscribeForm.module.css';

// EmailJS configuration
const SERVICE_ID = 'service_y0iefgs';
const TEMPLATE_USER_ID = 'template_9frtaks';
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
    setFormState(prev => ({ ...prev, [name]: value }));
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
        errorMessage: 'Please enter a valid email address'
      }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, isError: false }));

    try {
      // Format date for display in email (e.g., April 16, 2025)
      const displayDate = new Date(formState.unsubscribe_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Send email to user
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_USER_ID,
        {
          email: formState.user_email, // This matches the {{email}} in recipient field
          to_email: formState.user_email, // This matches the {{to_email}} used in content
          unsubscribe_date: displayDate,
          from_name: 'DCreativo',
          reply_to: 'info@dcreativo.ch'
        },
        PUBLIC_KEY
      );

      // Send email to admin
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
        errorMessage: 'Failed to process your request. Please try again later.'
      }));
    }
  };

  return (
    <div className={styles.unsubscribeContainer}>
      <div className={styles.unsubscribeCard}>
        <div className={styles.unsubscribeHeader}>
          <img src="/logo/dcreativo-logo.svg" alt="DCreativo Logo" className={styles.unsubscribeLogo} />
          <h1>Annulla iscrizione alla newsletter</h1>
        </div>

        {formState.isSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Annullamento iscrizione riuscito</h2>
            <p>Il tuo indirizzo email è stato rimosso con successo dalla nostra mailing list. Non riceverai più email promozionali da DCreativo.</p>
            <p>Un'e-mail di conferma è stata inviata alla tua casella di posta.</p>
            <a href="https://dcreativo.ch" className={styles.homeButton}>Ritorna alla home page</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.unsubscribeForm}>
            <p className={styles.formDescription}>
            Inserisci il tuo indirizzo email per annullare l'iscrizione alle nostre email promozionali.
            Una conferma verrà inviata al tuo indirizzo email.
            </p>

            {formState.isError && (
              <div className={styles.errorMessage}>
                {formState.errorMessage}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="user_email">Indirizzo e-mail</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formState.user_email}
                onChange={handleChange}
                placeholder="Il tuo indirizzo e-mail"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="unsubscribe_date">Data di annullamento dell'iscrizione</label>
              <input
                type="date"
                id="unsubscribe_date"
                name="unsubscribe_date"
                value={formState.unsubscribe_date}
                onChange={handleChange}
                readOnly
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Processing...' : 'Unsubscribe'}
            </button>

            <p className={styles.privacyNote}>
            La tua privacy è importante per noi. Elaboreremo questa richiesta immediatamente.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default UnsubscribeForm;
