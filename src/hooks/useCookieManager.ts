'use client';

import { useCookieConsent } from '@/cookies/CookieConsentProvider';

/**
 * Hook personalizzato per gestire i cookie in base alle preferenze dell'utente
 * Utile per integrare servizi di terze parti come Google Analytics, Facebook Pixel, ecc.
 */
export const useCookieManager = () => {
  const { cookieSettings, hasConsent } = useCookieConsent();

  /**
   * Inizializza Google Analytics se l'utente ha dato il consenso
   */
  const initGoogleAnalytics = (gaId: string) => {
    if (hasConsent && cookieSettings.analytics) {
      // In un'implementazione reale, qui andresti ad inizializzare Google Analytics
      // Questo è solo un placeholder per mostrare come si potrebbe implementare
      console.log(`Inizializzazione Google Analytics con ID: ${gaId}`);

      // Esempio di codice per GA4 (commentato poiché non effettivamente implementato)
      /*
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaId);
      */
    }
  };

  /**
   * Inizializza Facebook Pixel se l'utente ha dato il consenso
   */
  const initFacebookPixel = (pixelId: string) => {
    if (hasConsent && cookieSettings.marketing) {
      console.log(`Inizializzazione Facebook Pixel con ID: ${pixelId}`);

      // Esempio di codice per Facebook Pixel (commentato poiché non effettivamente implementato)
      /*
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', pixelId);
      fbq('track', 'PageView');
      */
    }
  };

  /**
   * Registra una preferenza utente se consentito
   */
  const setUserPreference = (key: string, value: string) => {
    if (hasConsent && cookieSettings.preferences) {
      localStorage.setItem(key, value);
      return true;
    }
    return false;
  };

  /**
   * Ottiene una preferenza utente se consentito
   */
  const getUserPreference = (key: string) => {
    if (hasConsent && cookieSettings.preferences) {
      return localStorage.getItem(key);
    }
    return null;
  };

  return {
    hasConsent,
    cookieSettings,
    initGoogleAnalytics,
    initFacebookPixel,
    setUserPreference,
    getUserPreference
  };
};
