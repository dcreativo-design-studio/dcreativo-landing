'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiPhone, FiX } from 'react-icons/fi';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openModal = (content: 'privacy' | 'terms') => {
    setModalContent(content);
    setShowModal(true);
    // Previeni lo scrolling del body quando il modale è aperto
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    // Ripristina lo scrolling del body
    document.body.style.overflow = 'auto';
  };

  return (
    <footer className="bg-white dark:bg-dark-800 pt-20 pb-10">
      <div className="container-custom">
        {/* Upper footer with logo and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and tagline */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/logo/logo.png"
                  alt="DCreativo Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">RICCIO DIGITAL</span>
            </Link>
            <p className="text-dark-600 dark:text-light-400 mb-4">
              Soluzioni web all'avanguardia con automazioni intelligenti per la tua attività.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/dcreativo-design-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/design-creativo-digitale/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:info@dcreativo.ch"
                className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Chi Sono
                </Link>
              </li>
              <li>
                <Link
                  href="#barbershop-showcase"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Demo Barbershop
                </Link>
              </li>
              <li>
                <Link
                  href="#family-center-showcase"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Demo Gestionale
                </Link>
              </li>
              <li>
                <Link
                  href="#roi-calculator"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Calcola il tuo ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Servizi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#barbershop-showcase"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  App per Barbershop
                </Link>
              </li>
              <li>
                <Link
                  href="#family-center-showcase"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Gestionale Multi-Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Automazioni Digitali
                </Link>
              </li>
              <li>
                <Link
                  href="#roi-calculator"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Consulenza ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="mt-1 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@dcreativo.ch"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@dcreativo.ch
                </a>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+41767810194"
                  className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  +41 76 781 01 94
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="mt-4 inline-block font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Invia un messaggio →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            aria-label="Torna in cima"
          >
            <FiArrowUp size={24} />
          </motion.button>
        </div>

        {/* Bottom footer with copyright and links */}
<div className="border-t border-light-400 dark:border-dark-600 pt-6 flex flex-col md:flex-row justify-between items-center">
  <p className="text-sm text-dark-600 dark:text-light-400 mb-4 md:mb-0">
    © {new Date().getFullYear()} RICCIO DIGITAL. Tutti i diritti riservati.
  </p>
  <div className="flex space-x-4 text-sm">
    <button
      onClick={() => openModal('privacy')}
      className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      Privacy Policy
    </button>
    <button
      onClick={() => openModal('terms')}
      className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      Termini di Servizio
    </button>
    <Link
      href="/cookie-settings"
      className="text-dark-600 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      Impostazioni Cookie
    </Link>
  </div>
</div>
      </div>
      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4
              }}
              className="bg-white dark:bg-dark-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-light-300 dark:border-dark-600 p-6">
                <h2 className="text-2xl font-bold">
                  {modalContent === 'privacy' ? 'Informativa sulla Privacy' : 'Termini di Servizio'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full bg-light-200 dark:bg-dark-600 text-dark-700 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-500 transition-colors"
                  aria-label="Chiudi"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Modal Body with scrollable content */}
              <div className="overflow-y-auto p-6 custom-scrollbar flex-1">
                {modalContent === 'privacy' ? (
                  <PrivacyPolicyContent />
                ) : (
                  <TermsOfServiceContent />
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-light-300 dark:border-dark-600 p-6 flex justify-between items-center">
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <FiMail className="mr-2 text-primary-600 dark:text-primary-400" />
                    <a href="mailto:info@dcreativo.ch" className="text-dark-700 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400">
                      info@dcreativo.ch
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="mr-2 text-primary-600 dark:text-primary-400" />
                    <a href="tel:+41767810194" className="text-dark-700 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400">
                      +41 767 810 194
                    </a>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="btn-primary text-sm"
                >
                  Ho capito
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

const PrivacyPolicyContent = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold mb-4">1. Introduzione</h3>
        <p className="mb-3">
          Benvenuto nell'Informativa sulla Privacy di RICCIO DIGITAL. Il rispetto della tua privacy è di fondamentale importanza per noi.
          Questa informativa descrive quali dati personali raccogliamo, come li utilizziamo e le opzioni di cui disponi riguardo a tali dati.
        </p>
        <p>
          Utilizzando il nostro sito web e i nostri servizi, accetti le pratiche descritte in questa informativa.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">2. Dati Personali Raccolti</h3>
        <p className="mb-3">
          Possiamo raccogliere i seguenti tipi di dati personali:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dati di contatto:</strong> nome, indirizzo email, numero di telefono, indirizzo postale, quando li fornisci tramite i nostri moduli di contatto o durante l'utilizzo dei nostri servizi.
          </li>
          <li>
            <strong>Dati di utilizzo:</strong> informazioni su come interagisci con il nostro sito web, come le pagine visitate, i link cliccati e altre azioni.
          </li>
          <li>
            <strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, provider di servizi internet, informazioni sul dispositivo, dati di navigazione e timestamp.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">3. Finalità del Trattamento</h3>
        <p className="mb-3">
          Utilizziamo i tuoi dati personali per:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fornirti i servizi richiesti e rispondere alle tue domande</li>
          <li>Migliorare e personalizzare la tua esperienza sul nostro sito</li>
          <li>Inviarti comunicazioni relative ai nostri servizi, se hai dato il tuo consenso</li>
          <li>Svolgere analisi per migliorare il nostro sito e i nostri servizi</li>
          <li>Adempiere agli obblighi legali</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">4. Base Giuridica del Trattamento</h3>
        <p>
          Trattiamo i tuoi dati personali in base a: consenso esplicito, adempimento di obblighi contrattuali, legittimo interesse (come migliorare i nostri servizi) e obblighi legali.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">5. Conservazione dei Dati</h3>
        <p>
          Conserviamo i tuoi dati personali solo per il tempo necessario alle finalità per cui sono stati raccolti, o per adempiere agli obblighi legali e normativi.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">6. Diritti dell'Interessato</h3>
        <p className="mb-3">
          Hai il diritto di:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accedere ai tuoi dati personali</li>
          <li>Rettificare i tuoi dati personali se imprecisi</li>
          <li>Richiedere la cancellazione dei tuoi dati personali</li>
          <li>Opporti al trattamento dei tuoi dati personali</li>
          <li>Richiedere la limitazione del trattamento dei tuoi dati personali</li>
          <li>Richiedere la portabilità dei tuoi dati personali</li>
        </ul>
        <p className="mt-3">
          Per esercitare questi diritti, contattaci all'indirizzo email: <a href="mailto:info@dcreativo.ch" className="text-primary-600 dark:text-primary-400">info@dcreativo.ch</a>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">7. Cookie e Tecnologie Simili</h3>
        <p>
          Il nostro sito web utilizza cookie e tecnologie simili per migliorare la tua esperienza di navigazione. Puoi gestire le preferenze relative ai cookie attraverso le impostazioni del tuo browser.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">8. Contatti</h3>
        <p className="mb-3">
          Per qualsiasi domanda relativa a questa informativa sulla privacy o al trattamento dei tuoi dati personali, puoi contattarci ai seguenti recapiti:
        </p>
        <ul className="space-y-2">
          <li><strong>Email:</strong> <a href="mailto:info@dcreativo.ch" className="text-primary-600 dark:text-primary-400">info@dcreativo.ch</a></li>
          <li><strong>Telefono:</strong> <a href="tel:+41767810194" className="text-primary-600 dark:text-primary-400">+41 767 810 194</a></li>
          <li><strong>Indirizzo:</strong> Via Ol Mött 6, 6703 Osogna, Svizzera</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">9. Modifiche all'Informativa sulla Privacy</h3>
        <p>
          Ci riserviamo il diritto di modificare questa informativa sulla privacy in qualsiasi momento. Ogni modifica sarà pubblicata su questa pagina con la data dell'ultimo aggiornamento.
        </p>
      </section>

      <p className="text-sm text-dark-500 dark:text-light-500 italic mt-8">
        Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
};

const TermsOfServiceContent = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold mb-4">1. Accettazione dei Termini</h3>
        <p>
          Utilizzando il sito web di RICCIO DIGITAL (dcreativo.ch) e i relativi servizi, l'utente accetta integralmente i presenti Termini di Servizio. Se non si accettano questi termini, si prega di non utilizzare il sito o i servizi offerti.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">2. Descrizione dei Servizi</h3>
        <p>
          RICCIO DIGITAL offre servizi di sviluppo web, progettazione di applicazioni, automazione di processi digitali e consulenza tecnica. I dettagli specifici di ogni servizio saranno concordati direttamente con il cliente attraverso contratti o accordi separati.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">3. Proprietà Intellettuale</h3>
        <p className="mb-3">
          Tutti i contenuti presenti sul sito web di RICCIO DIGITAL, inclusi ma non limitati a testi, grafica, logo, immagini, audio, video, software e codice sorgente, sono di proprietà di RICCIO DIGITAL o dei rispettivi proprietari e sono protetti dalle leggi sul diritto d'autore.
        </p>
        <p>
          Il cliente mantiene la proprietà di tutti i contenuti che fornisce a RICCIO DIGITAL per l'esecuzione dei servizi. I diritti di proprietà intellettuale relativi ai prodotti finali saranno regolati dagli accordi specifici tra RICCIO DIGITAL e il cliente.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">4. Responsabilità dell'Utente</h3>
        <p className="mb-3">
          Utilizzando il nostro sito web e i nostri servizi, l'utente si impegna a:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fornire informazioni accurate e veritiere</li>
          <li>Non utilizzare il sito o i servizi per scopi illegali o non autorizzati</li>
          <li>Non tentare di accedere a aree riservate del sito senza autorizzazione</li>
          <li>Non interferire con il normale funzionamento del sito</li>
          <li>Non violare i diritti di proprietà intellettuale di RICCIO DIGITAL o di terzi</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">5. Limitazione di Responsabilità</h3>
        <p>
          RICCIO DIGITAL si impegna a mantenere il sito web funzionante e sicuro, ma non può garantire che sia privo di errori o sempre disponibile. Il sito e i suoi contenuti sono forniti "così come sono" senza garanzie di alcun tipo, espresse o implicite.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">6. Progetti e Servizi</h3>
        <p className="mb-3">
          Per i progetti e i servizi commissionati:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>I termini specifici, compresi tempi di consegna, pagamenti e specifiche tecniche, saranno concordati separatamente per ogni progetto</li>
          <li>RICCIO DIGITAL si riserva il diritto di includere riferimenti ai progetti completati nel proprio portfolio, salvo diverso accordo con il cliente</li>
          <li>Il cliente è responsabile della fornitura di contenuti, materiali e approvazioni nei tempi concordati</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">7. Pagamenti</h3>
        <p>
          Le modalità di pagamento, le tariffe e le scadenze saranno specificate negli accordi con il cliente. Salvo diversamente concordato, le fatture devono essere saldate entro 30 giorni dalla data di emissione.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">8. Cessazione del Servizio</h3>
        <p>
          RICCIO DIGITAL si riserva il diritto di sospendere o terminare l'accesso ai servizi in caso di violazione dei presenti termini. La cessazione dei servizi sarà regolata dagli accordi specifici con il cliente.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">9. Privacy</h3>
        <p>
          La raccolta e il trattamento dei dati personali sono regolati dalla nostra Informativa sulla Privacy, disponibile sul nostro sito web.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">10. Modifiche ai Termini</h3>
        <p>
          RICCIO DIGITAL si riserva il diritto di modificare questi Termini di Servizio in qualsiasi momento. Le modifiche saranno effettive dal momento della pubblicazione sul sito. L'uso continuato del sito dopo tali modifiche costituisce accettazione dei nuovi termini.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">11. Contatti</h3>
        <p className="mb-3">
          Per qualsiasi domanda relativa a questi Termini di Servizio, puoi contattarci ai seguenti recapiti:
        </p>
        <ul className="space-y-2">
          <li><strong>Email:</strong> <a href="mailto:info@dcreativo.ch" className="text-primary-600 dark:text-primary-400">info@dcreativo.ch</a></li>
          <li><strong>Telefono:</strong> <a href="tel:+41767810194" className="text-primary-600 dark:text-primary-400">+41 767 810 194</a></li>
          <li><strong>Indirizzo:</strong> Via Ol Mött 6, 6703 Osogna, Svizzera</li>
        </ul>
      </section>

      <p className="text-sm text-dark-500 dark:text-light-500 italic mt-8">
        Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
};

export default Footer;
