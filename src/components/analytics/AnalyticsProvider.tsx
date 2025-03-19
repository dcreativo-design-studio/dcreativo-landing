'use client';

import { useCookieManager } from '@/hooks/useCookieManager';
import { useEffect } from 'react';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { initGoogleAnalytics } = useCookieManager();

  useEffect(() => {
    // Inizializza Google Analytics se l'utente ha dato il consenso
    initGoogleAnalytics('G-XXXXXXXXXX'); // Sostituisci con il tuo ID di GA
  }, [initGoogleAnalytics]);

  return <>{children}</>;
}
