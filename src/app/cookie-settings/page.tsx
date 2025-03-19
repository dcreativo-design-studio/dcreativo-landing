'use client';

import { useCookieConsent } from '@/cookies/CookieConsentProvider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiCheckCircle, FiInfo } from 'react-icons/fi';

/**
 * Pagina dedicata alla gestione dei cookie
 * Può essere accessibile attraverso un link nel footer o nella privacy policy
 */
export default function CookieSettingsPage() {
  const { cookieSettings, updateSettings, resetConsent } = useCookieConsent();
  const [localSettings, setLocalSettings] = useState(cookieSettings);
  const [saved, setSaved] = useState(false);

  // Inizializza le impostazioni locali con quelle globali
  useEffect(() => {
    setLocalSettings(cookieSettings);
  }, [cookieSettings]);

  // Gestisce il cambiamento nelle impostazioni
  const handleSettingChange = (setting: keyof typeof localSettings) => {
    if (setting === 'necessary') return; // Non permettere di disattivare i cookie necessari

    setLocalSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Salva le impostazioni
  const saveSettings = () => {
    updateSettings(localSettings);
    setSaved(true);

    // Nascondi il messaggio di successo dopo 3 secondi
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // Resetta tutte le preferenze
  const handleReset = () => {
    resetConsent();
    // Il provider si occuperà di resettare tutto e mostrare nuovamente il banner
  };

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Torna alla home
          </Link>

          <h1 className="text-3xl font-bold mb-4">Impostazioni Cookie</h1>
          <p className="text-dark-600 dark:text-light-400 mb-6">
            Qui puoi gestire le tue preferenze sui cookie. I cookie necessari sono sempre attivi in quanto essenziali per il funzionamento del sito.
          </p>

          {/* Messaggio di successo */}
          {saved && (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg flex items-center mb-6">
              <FiCheckCircle className="mr-2 flex-shrink-0" />
              <span>Le tue preferenze sono state salvate con successo.</span>
            </div>
          )}

          {/* Nota informativa */}
          <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 p-4 rounded-lg flex items-start mb-8">
            <FiInfo className="mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Cosa sono i cookie?</h3>
              <p className="text-sm">
                I cookie sono piccoli file di testo che i siti web possono utilizzare per rendere l'esperienza dell'utente più efficiente. Secondo la legge, possiamo memorizzare i cookie sul tuo dispositivo se sono strettamente necessari per il funzionamento di questo sito. Per tutti gli altri tipi di cookie abbiamo bisogno del tuo permesso.
              </p>
            </div>
          </div>
        </div>

        {/* Impostazioni cookie */}
        <div className="space-y-6 mb-8">
          {/* Cookie necessari */}
          <div className="p-6 bg-white dark:bg-dark-700 rounded-xl shadow border border-light-300 dark:border-dark-500">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">Cookie necessari</h3>
                <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full">
                  Sempre attivi
                </span>
              </div>
              <div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-green-500 cursor-not-allowed">
                  <span className="absolute inset-y-1 right-1 w-4 h-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <p className="text-dark-600 dark:text-light-400">
              Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. Generalmente vengono impostati solo in risposta alle azioni da te effettuate che costituiscono una richiesta di servizi, come l'impostazione delle preferenze di privacy, l'accesso o la compilazione di moduli.
            </p>
          </div>

          {/* Cookie analitici */}
          <div className="p-6 bg-white dark:bg-dark-700 rounded-xl shadow border border-light-300 dark:border-dark-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Cookie analitici</h3>
              <div>
                <button
                  onClick={() => handleSettingChange('analytics')}
                  className={`relative inline-block w-12 h-6 rounded-full ${
                    localSettings.analytics ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  } transition-colors duration-200`}
                  aria-label={localSettings.analytics ? 'Disattiva cookie analitici' : 'Attiva cookie analitici'}
                >
                  <span
                    className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                      localSettings.analytics ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
            <p className="text-dark-600 dark:text-light-400">
              Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali pagine sono più o meno popolari e come i visitatori si muovono nel sito. Tutte le informazioni raccolte da questi cookie sono aggregate e quindi anonime.
            </p>
          </div>

          {/* Cookie di marketing */}
          <div className="p-6 bg-white dark:bg-dark-700 rounded-xl shadow border border-light-300 dark:border-dark-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Cookie di marketing</h3>
              <div>
                <button
                  onClick={() => handleSettingChange('marketing')}
                  className={`relative inline-block w-12 h-6 rounded-full ${
                    localSettings.marketing ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  } transition-colors duration-200`}
                  aria-label={localSettings.marketing ? 'Disattiva cookie di marketing' : 'Attiva cookie di marketing'}
                >
                  <span
                    className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                      localSettings.marketing ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
            <p className="text-dark-600 dark:text-light-400">
              Questi cookie possono essere impostati attraverso il nostro sito dai nostri partner pubblicitari. Possono essere utilizzati da queste aziende per costruire un profilo delle tue preferenze e mostrarti annunci pertinenti su altri siti. Non memorizzano direttamente informazioni personali, ma sono basati sull'identificazione univoca del tuo browser e dispositivo Internet.
            </p>
          </div>

          {/* Cookie di preferenza */}
          <div className="p-6 bg-white dark:bg-dark-700 rounded-xl shadow border border-light-300 dark:border-dark-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Cookie di preferenza</h3>
              <div>
                <button
                  onClick={() => handleSettingChange('preferences')}
                  className={`relative inline-block w-12 h-6 rounded-full ${
                    localSettings.preferences ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  } transition-colors duration-200`}
                  aria-label={localSettings.preferences ? 'Disattiva cookie di preferenza' : 'Attiva cookie di preferenza'}
                >
                  <span
                    className={`absolute inset-y-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                      localSettings.preferences ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
            <p className="text-dark-600 dark:text-light-400">
              Questi cookie permettono al sito di ricordare le scelte che hai fatto in passato, come la lingua preferita o la regione in cui ti trovi. Possono anche essere utilizzati per fornire servizi che hai richiesto come guardare un video o commentare un blog. Le informazioni raccolte da questi cookie possono essere anonimizzate e non possono tracciare la tua attività di navigazione su altri siti web.
            </p>
          </div>
        </div>

        {/* Azioni */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 border border-light-400 dark:border-dark-500 rounded-lg text-dark-700 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-600 transition-colors"
          >
            Reimposta tutte le preferenze
          </button>

          <button
            onClick={saveSettings}
            className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Salva impostazioni
          </button>
        </div>
      </div>
    </div>
  );
}
