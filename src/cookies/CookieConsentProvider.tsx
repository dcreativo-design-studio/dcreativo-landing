'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Definizione delle impostazioni dei cookie
export interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// Definizione del contesto
interface CookieConsentContextType {
  cookieSettings: CookieSettings;
  hasConsent: boolean;
  updateSettings: (settings: Partial<CookieSettings>) => void;
  resetConsent: () => void;
  showConsentBanner: () => void;
}

// Creazione del contesto
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

// Provider per il contesto
export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Inizializzazione: carica le impostazioni dal localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      if (consent === 'true') {
        setHasConsent(true);

        try {
          const savedSettings = JSON.parse(localStorage.getItem('cookie-settings') || '{}');
          setCookieSettings(prev => ({
            ...prev,
            ...savedSettings,
          }));
        } catch (error) {
          console.error("Errore nel parsing delle impostazioni cookie:", error);
        }
      } else {
        // Mostra il banner se non c'è consenso
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Aggiorna le impostazioni dei cookie
  const updateSettings = (settings: Partial<CookieSettings>) => {
    // Assicurati che i cookie necessari siano sempre attivi
    const newSettings = {
      ...cookieSettings,
      ...settings,
      necessary: true
    };

    setCookieSettings(newSettings);
    setHasConsent(true);
    setShowBanner(false);

    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(newSettings));

    // Qui implementeresti le funzioni per gestire i vari tipi di cookie
    applySettings(newSettings);
  };

  // Applica le impostazioni (implementazione di esempio)
  const applySettings = (settings: CookieSettings) => {
    // Funzioni di esempio per gestire i vari tipi di cookie
    // In un'implementazione reale, qui andrebbero le chiamate alle librerie di analytics, ecc.

    if (settings.analytics) {
      // Inizializza analytics (es. Google Analytics)
      console.log('Analytics cookies enabled');
    }

    if (settings.marketing) {
      // Inizializza cookie di marketing (es. Facebook Pixel)
      console.log('Marketing cookies enabled');
    }

    if (settings.preferences) {
      // Inizializza cookie di preferenza
      console.log('Preference cookies enabled');
    }
  };

  // Reimposta il consenso (rimuove il consenso esistente)
  const resetConsent = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-settings');
    setHasConsent(false);
    setCookieSettings({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    setShowBanner(true);
  };

  // Mostra il banner del consenso
  const showConsentBanner = () => {
    setShowBanner(true);
  };

  // Valore del contesto
  const value = {
    cookieSettings,
    hasConsent,
    updateSettings,
    resetConsent,
    showConsentBanner
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showBanner && <CookieConsentComponent />}
    </CookieConsentContext.Provider>
  );
};

// Hook per utilizzare il contesto
export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent deve essere utilizzato all\'interno di un CookieConsentProvider');
  }
  return context;
};

// Componente lazy-loaded per il banner dei cookie
// Utilizziamo dynamic import per ridurre il peso iniziale del bundle
import dynamic from 'next/dynamic';

const CookieConsentComponent = dynamic(() => import('./CookieConsent'), {
  ssr: false,
  loading: () => null,
});
