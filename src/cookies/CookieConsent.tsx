'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiInfo, FiSettings, FiX } from 'react-icons/fi';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent = () => {
  // Stati per il consenso ai cookie
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Sempre attivo, non modificabile
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Controllo se il consenso è già stato dato
  useEffect(() => {
    // Prima di tutto, verifichiamo se il codice è eseguito nel browser
    if (typeof window !== 'undefined') {
      const hasConsent = localStorage.getItem('cookie-consent');

      // Se non c'è consenso, mostra il banner dopo un breve ritardo
      if (!hasConsent) {
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1500); // Ritardo per dare il tempo alla pagina di caricare

        return () => clearTimeout(timer);
      } else {
        // Se c'è già consenso, carica le impostazioni salvate
        try {
          const savedSettings = JSON.parse(localStorage.getItem('cookie-settings') || '{}');
          setCookieSettings(prev => ({
            ...prev,
            ...savedSettings
          }));
        } catch (error) {
          console.error("Errore nel parsing delle impostazioni cookie:", error);
        }
      }
    }
  }, []);

  // Salva le impostazioni e dà il consenso
  const saveSettings = () => {
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(cookieSettings));

    // Qui si implementerebbero le funzioni per gestire i vari tipi di cookie
    // in base alle impostazioni selezionate dall'utente

    setShowBanner(false);
    setShowSettings(false);
  };

  // Accetta tutti i cookie
  const acceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    setCookieSettings(allEnabled);
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(allEnabled));

    // Qui si implementerebbero le funzioni per attivare tutti i tipi di cookie

    setShowBanner(false);
  };

  // Accetta solo i cookie necessari
  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    setCookieSettings(necessaryOnly);
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(necessaryOnly));

    // Qui si implementerebbero le funzioni per attivare solo i cookie necessari

    setShowBanner(false);
  };

  // Gestisci il cambiamento nelle impostazioni
  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return; // Non permettere di disattivare i cookie necessari

    setCookieSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <>
      {/* Banner principale per il consenso ai cookie */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto bg-white dark:bg-dark-700 rounded-xl shadow-2xl overflow-hidden border border-light-300 dark:border-dark-500">
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Sezione principale */}
                <div className="p-6 md:col-span-8 lg:col-span-9">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4 flex-shrink-0">
                      <FiInfo className="text-primary-600 dark:text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Informativa sui Cookie</h3>
                      <p className="text-dark-600 dark:text-light-400 mb-4">
                        Utilizziamo i cookie per offrirti la migliore esperienza sul nostro sito. Alcuni cookie sono necessari per il funzionamento del sito, mentre altri ci aiutano a migliorare la tua esperienza attraverso analisi e personalizzazione.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FiCheckCircle className="text-green-600 mr-2" size={18} />
                      <span className="text-sm">Cookie necessari (sempre attivi)</span>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-light-500 ml-6">
                      Essenziali per la navigazione e le funzionalità di base del sito.
                    </p>
                  </div>
                </div>

                {/* Pulsanti di azione */}
                <div className="bg-light-100 dark:bg-dark-800 p-6 flex flex-col justify-center space-y-3 md:col-span-4 lg:col-span-3">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center justify-center px-4 py-2 border border-light-400 dark:border-dark-500 text-dark-700 dark:text-light-300 rounded-lg hover:bg-light-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    <FiSettings className="mr-2" />
                    Personalizza
                  </button>

                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2 border border-light-400 dark:border-dark-500 text-dark-700 dark:text-light-300 rounded-lg hover:bg-light-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    Solo necessari
                  </button>

                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Accetta tutti
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale delle impostazioni avanzate */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-light-300 dark:border-dark-500 p-6">
                <h3 className="text-xl font-bold">Impostazioni Cookie</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-full bg-light-200 dark:bg-dark-600 text-dark-700 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-500 transition-colors"
                  aria-label="Chiudi"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-dark-600 dark:text-light-400 mb-6">
                  Personalizza le tue preferenze sui cookie. I cookie necessari non possono essere disattivati poiché sono essenziali per il funzionamento del sito.
                </p>

                <div className="space-y-6">
                  {/* Cookie necessari */}
                  <div className="p-4 bg-light-100 dark:bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h4 className="font-semibold">Cookie necessari</h4>
                        <span className="ml-2 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full">
                          Sempre attivi
                        </span>
                      </div>
                      <div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-green-500 cursor-not-allowed">
                          <span className="absolute inset-y-1 right-1 w-4 h-4 rounded-full bg-white"></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-light-500">
                      Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. Generalmente vengono impostati solo in risposta alle azioni da te effettuate che costituiscono una richiesta di servizi.
                    </p>
                  </div>

                  {/* Cookie analitici */}
                  <div className="p-4 bg-light-100 dark:bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Cookie analitici</h4>
                      <div>
                        <button
                          onClick={() => handleSettingChange('analytics')}
                          className={`relative inline-block w-12 h-6 rounded-full ${
                            cookieSettings.analytics ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          } transition-colors duration-200`}
                        >
                          <span
                            className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                              cookieSettings.analytics ? 'right-1' : 'left-1'
                            }`}
                          ></span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-light-500">
                      Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali pagine sono più o meno popolari e come i visitatori si muovono nel sito.
                    </p>
                  </div>

                  {/* Cookie di marketing */}
                  <div className="p-4 bg-light-100 dark:bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Cookie di marketing</h4>
                      <div>
                        <button
                          onClick={() => handleSettingChange('marketing')}
                          className={`relative inline-block w-12 h-6 rounded-full ${
                            cookieSettings.marketing ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          } transition-colors duration-200`}
                        >
                          <span
                            className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                              cookieSettings.marketing ? 'right-1' : 'left-1'
                            }`}
                          ></span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-light-500">
                      Questi cookie possono essere impostati attraverso il nostro sito dai nostri partner pubblicitari. Possono essere utilizzati da queste aziende per costruire un profilo delle tue preferenze e mostrarti annunci pertinenti su altri siti.
                    </p>
                  </div>

                  {/* Cookie di preferenza */}
                  <div className="p-4 bg-light-100 dark:bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Cookie di preferenza</h4>
                      <div>
                        <button
                          onClick={() => handleSettingChange('preferences')}
                          className={`relative inline-block w-12 h-6 rounded-full ${
                            cookieSettings.preferences ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          } transition-colors duration-200`}
                        >
                          <span
                            className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                              cookieSettings.preferences ? 'right-1' : 'left-1'
                            }`}
                          ></span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-light-500">
                      Questi cookie permettono al sito di ricordare le scelte che hai fatto in passato, come la lingua preferita o la regione in cui ti trovi. Possono anche essere utilizzati per fornire servizi che hai richiesto.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-light-300 dark:border-dark-500 p-6 flex justify-between">
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 border border-light-400 dark:border-dark-500 text-dark-700 dark:text-light-300 rounded-lg hover:bg-light-200 dark:hover:bg-dark-600 transition-colors"
                >
                  Solo necessari
                </button>

                <div className="space-x-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-light-400 dark:border-dark-500 text-dark-700 dark:text-light-300 rounded-lg hover:bg-light-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    Annulla
                  </button>

                  <button
                    onClick={saveSettings}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Salva preferenze
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
