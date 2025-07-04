// api/send-proposal.js - Soluzione corretta per PDF
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { signatureData, pdfBase64, pdfQuality } = req.body;

    console.log('📧 Ricevuta richiesta invio email per Centro Sinapsi');
    console.log('📊 Dati firma ricevuti:', {
      date: signatureData.date,
      clientIP: signatureData.clientIP,
      paymentOption: signatureData.paymentOption?.description || 'N/A'
    });

    // ✅ CORREZIONE: Pulisci il PDF base64 se contiene header
    let cleanPdfBase64 = pdfBase64;
    if (pdfBase64.startsWith('data:')) {
      // Rimuove header data URI se presente
      cleanPdfBase64 = pdfBase64.split(',')[1];
      console.log('🧹 Rimosso header data URI dal PDF');
    }

    // ✅ VERIFICA VALIDITÀ PDF BASE64
    if (!cleanPdfBase64 || cleanPdfBase64.length < 1000) {
      throw new Error('PDF base64 non valido o troppo piccolo');
    }

    console.log('📄 PDF ricevuto - Dimensione base64:', Math.round(cleanPdfBase64.length * 0.75 / 1024), 'KB stimati');

    // Configurazione email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verifica configurazione
    await transporter.verify();
    console.log('✅ Configurazione email verificata');

    // Prepara descrizione pagamento
    let paymentDescription = 'Opzione selezionata';
    let totalAmount = 'CHF 4\'800+';
    let paymentAmount = '1440.00';
    let paymentReference = '';

    if (signatureData.paymentOption && signatureData.paymentOption.description) {
      paymentDescription = signatureData.paymentOption.description;
      totalAmount = signatureData.paymentOption.total || totalAmount;

      if (signatureData.paymentOption.details) {
        paymentDescription += ' - ' + signatureData.paymentOption.details;
      }
    }

    // Genera riferimento unico per il pagamento
    const timestamp = new Date().getTime();
    paymentReference = `CS-${timestamp.toString().slice(-8)}`;

    console.log('💰 Generazione cedola pagamento...');

    // 🎯 GENERA CEDOLA SEMPLICE E AFFIDABILE
    const paymentSlipData = await generateSimplePaymentSlip({
      amount: paymentAmount,
      currency: 'CHF',
      reference: paymentReference,
      creditor: {
        name: 'Domenico Riccio',
        address: 'Via Ol Mött 6',
        postalCode: '6703',
        city: 'Osogna',
        country: 'CH'
      },
      debtor: {
        name: 'Centro Sinapsi',
        address: 'Via Toron d\'Örz 7',
        postalCode: '6703',
        city: 'Osogna',
        country: 'CH'
      },
      iban: 'CH93 0076 2011 6238 5295 7',
      message: `Acconto 30% - Sviluppo PWA Centro Sinapsi - Servizi Domenico Riccio - Proposta firmata ${new Date().toLocaleDateString('it-IT')}`
    });

    // Template email professionale per la cliente (INVARIATO)
    const clientEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proposta Centro Sinapsi Firmata</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5;">
        <table role="presentation" style="width: 100%; margin: 0; padding: 20px 0; background-color: #f0f2f5;" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0" border="0">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1877F2 0%, #166FE5 100%); color: #ffffff; padding: 30px 25px; text-align: center;">
                    <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">Domenico Riccio</h1>
                    <p style="margin: 0 0 15px 0; font-size: 16px; opacity: 0.95;">Web & App Solutions</p>
                    <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block;">
                      Full-Stack Senior Developer • 5+ anni esperienza
                    </div>
                  </td>
                </tr>

                <!-- Success Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #42B883 0%, #369870 100%); color: #ffffff; padding: 20px; text-align: center;">
                    <div style="font-size: 32px; margin-bottom: 10px;">🎉</div>
                    <h2 style="margin: 0 0 5px 0; font-size: 18px; font-weight: 600;">Proposta Accettata con Successo!</h2>
                    <p style="margin: 0; font-size: 14px; opacity: 0.95;">La proposta Centro Sinapsi PWA è stata firmata digitalmente</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 25px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #1877F2;">Ciao Shote! 👋</h3>

                    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                      Grazie per aver firmato digitalmente la proposta per lo sviluppo della PWA Centro Sinapsi.
                    </p>

                    <!-- Details Box -->
                    <table role="presentation" style="width: 100%; background: #f7f8fa; border: 1px solid #e4e6ea; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #1877F2;">📋 Dettagli della firma:</h4>
                          <table role="presentation" style="width: 100%;" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Data:</strong> ${signatureData.date}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Opzione pagamento:</strong> ${signatureData.paymentOption.description}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Importo:</strong> ${totalAmount}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Riferimento:</strong> ${paymentReference}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- 💳 SEZIONE PAGAMENTO INTEGRATA NELL'EMAIL -->
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: #ffffff; border-radius: 12px; margin: 30px 0;" cellpadding="25" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 32px; margin-bottom: 8px;">💳</div>
                            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">Pagamento Acconto</h3>
                            <p style="margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">CHF ${paymentAmount}</p>
                          </div>

                          <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 8px; margin: 15px 0;">
                            <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #ffffff;">📋 Dati per il Bonifico:</h4>
                            <table style="width: 100%; color: #ffffff; font-size: 14px;">
                              <tr><td style="padding: 4px 0;"><strong>Beneficiario:</strong></td><td>Domenico Riccio</td></tr>
                              <tr><td style="padding: 4px 0;"><strong>IBAN:</strong></td><td style="font-family: monospace; font-weight: bold;">CH93 0076 2011 6238 5295 7</td></tr>
                              <tr><td style="padding: 4px 0;"><strong>Importo:</strong></td><td style="font-weight: bold;">CHF ${paymentAmount}</td></tr>
                              <tr><td style="padding: 4px 0;"><strong>Riferimento:</strong></td><td style="font-family: monospace; font-weight: bold;">${paymentReference}</td></tr>
                              <tr><td style="padding: 4px 0;"><strong>Causale:</strong></td><td>Acconto 30% PWA Centro Sinapsi</td></tr>
                            </table>
                          </div>

                          <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin: 15px 0;">
                            <h4 style="margin: 0 0 10px 0; font-size: 14px;">📱 QR Code per Pagamento Rapido:</h4>
                            <p style="margin: 0; font-size: 13px; line-height: 1.4;">
                              Il QR code per il pagamento è disponibile nel file allegato "Informazioni_Pagamento_${paymentReference}.txt"
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Attachment Notice -->
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #FFB946 0%, #FF8C42 100%); color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="18" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 8px;">📎</div>
                          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Allegati Inclusi</h3>
                          <p style="margin: 0; font-size: 14px; opacity: 0.95;">✓ Proposta firmata (PDF)<br>✓ Istruzioni dettagliate pagamento con QR code</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                      <strong>Prossimi passi:</strong><br>
                      1. Effettua il pagamento dell'acconto usando i dati sopra riportati<br>
                      2. Ti contatteremo entro 24 ore per organizzare il primo incontro<br>
                      3. Inizieremo subito lo sviluppo della tua PWA
                    </p>

                    <!-- Contact Info -->
                    <table role="presentation" style="width: 100%; background: #f7f8fa; border-radius: 8px; margin: 25px 0;" cellpadding="25" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #1c1e21;">📞 Contatti Diretti</h4>
                          <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>WhatsApp:</strong> +41 76 781 01 94</p>
                          <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Email:</strong> info@dcreativo.ch</p>
                          <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Web:</strong> dcreativo.ch</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #1c1e21; color: #e4e6ea; padding: 30px 25px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1877F2;">Domenico Riccio</h3>
                    <p style="margin: 0 0 15px 0; font-size: 13px; opacity: 0.8;">Web & App Solutions</p>
                    <p style="margin: 0; font-size: 12px; opacity: 0.6;">Sviluppatore Full-Stack Senior • Next.js • React • TypeScript</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Template email per il programmatore (INVARIATO)
    const developerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuova Proposta Firmata - Centro Sinapsi</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5;">
        <table role="presentation" style="width: 100%; margin: 0; padding: 20px 0; background-color: #f0f2f5;" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0" border="0">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #42B883 0%, #369870 100%); color: #ffffff; padding: 30px 25px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">PROPOSTA FIRMATA!</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Centro Sinapsi PWA</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 25px;">
                    <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #333;">
                      La cliente <strong>Shote del Centro Sinapsi</strong> ha appena firmato la proposta PWA.
                    </p>

                    <!-- Alert Box -->
                    <table role="presentation" style="width: 100%; background: #ff6b35; color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 10px 0; font-size: 18px;">🚀 AZIONE RICHIESTA:</h3>
                          <p style="margin: 0; font-size: 15px;">Contattare la cliente entro 24 ore per organizzare il primo incontro e verificare il pagamento dell'acconto.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Details Table -->
                    <table role="presentation" style="width: 100%; background: #f7f8fa; border: 1px solid #e4e6ea; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">📋 Dettagli Completi:</h4>
                          <table role="presentation" style="width: 100%;" cellpadding="0" cellspacing="0" border="0">
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Cliente:</strong> Centro Sinapsi - Shote</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Data firma:</strong> ${signatureData.date}</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Importo:</strong> ${totalAmount}</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Acconto richiesto:</strong> CHF ${paymentAmount}</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Riferimento pagamento:</strong> ${paymentReference}</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Opzione pagamento:</strong> ${paymentDescription}</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 14px;"><strong>IP cliente:</strong> ${signatureData.clientIP}</td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Contact Info -->
                    <table role="presentation" style="width: 100%; background: #e3f2fd; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">📞 Contatti Cliente:</h4>
                          <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> info@centrosinapsi.ch</p>
                          <p style="margin: 5px 0; font-size: 14px;"><strong>Tel:</strong> 078 846 06 87</p>
                          <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>Allegati:</strong> PDF firmato + Istruzioni pagamento</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // ✅ OPZIONI EMAIL CON PDF CORRETTO
    const clientMailOptions = {
      from: `"Domenico Riccio" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'd8572229@gmail.com', // email della cliente info@centrosinapsi.ch
      subject: '✅ Proposta Centro Sinapsi PWA - Firmata + Istruzioni Pagamento',
      html: clientEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: cleanPdfBase64, // ✅ PDF base64 pulito
          encoding: 'base64',
          contentType: 'application/pdf'
        },
        {
          filename: `Informazioni_Pagamento_${paymentReference}.txt`,
          content: paymentSlipData,
          encoding: 'base64',
          contentType: 'text/plain; charset=utf-8'
        }
      ]
    };

    // ✅ OPZIONI EMAIL PROGRAMMATORE CON PDF CORRETTO
    const developerMailOptions = {
      from: `"Centro Sinapsi PWA" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'timm81379@gmail.com', // email del programmatore
      subject: '🎉 Nuova Proposta Firmata - Centro Sinapsi + Dati Pagamento',
      html: developerEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: cleanPdfBase64, // ✅ PDF base64 pulito
          encoding: 'base64',
          contentType: 'application/pdf'
        },
        {
          filename: `Informazioni_Pagamento_${paymentReference}.txt`,
          content: paymentSlipData,
          encoding: 'base64',
          contentType: 'text/plain; charset=utf-8'
        }
      ]
    };

    // Invio email alla cliente
    console.log('📤 Invio email alla cliente...');
    const clientResult = await transporter.sendMail(clientMailOptions);
    console.log('✅ Email cliente inviata:', clientResult.messageId);

    // Invio email al programmatore
    console.log('📤 Invio email al programmatore...');
    const developerResult = await transporter.sendMail(developerMailOptions);
    console.log('✅ Email programmatore inviata:', developerResult.messageId);

    // Risposta di successo
    res.status(200).json({
      success: true,
      message: 'Email inviate con successo con PDF corretto!',
      clientMessageId: clientResult.messageId,
      developerMessageId: developerResult.messageId,
      paymentReference: paymentReference,
      pdfSize: Math.round(cleanPdfBase64.length * 0.75 / 1024) + 'KB'
    });

  } catch (error) {
    console.error('❌ Errore invio email:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString()
    });
  }
}

// ✅ FUNZIONI HELPER INVARIATE (generateSimplePaymentSlip, generateSwissQRCodeStable)
// Resta il codice precedente...
// ✅ FUNZIONI HELPER INVARIATE (generateSimplePaymentSlip, generateSwissQRCodeStable)
// 🎯 GENERA FILE DI TESTO CON ISTRUZIONI PAGAMENTO COMPLETE
async function generateSimplePaymentSlip(paymentData) {
  try {
    console.log('📄 Generazione istruzioni pagamento...');

    // Genera QR Code URL
    const qrCodeUrl = await generateSwissQRCodeStable(paymentData);

    // Crea contenuto dettagliato in formato testo
    const paymentContent = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ISTRUZIONI PER IL PAGAMENTO                         ║
║                        Centro Sinapsi - Sviluppo PWA                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

🎯 DATI PER IL BONIFICO BANCARIO
═══════════════════════════════════

Beneficiario:    ${paymentData.creditor.name}
Indirizzo:       ${paymentData.creditor.address}
                 ${paymentData.creditor.postalCode} ${paymentData.creditor.city}, ${paymentData.creditor.country}

IBAN:            ${paymentData.iban}

Importo:         ${paymentData.currency} ${paymentData.amount}

Riferimento:     ${paymentData.reference}
                 ⚠️ IMPORTANTE: Inserisci questo riferimento nel bonifico

Causale:         ${paymentData.message}

Data limite:     Non specificata (consigliato entro 7 giorni)

═══════════════════════════════════════════════════════════════════════════════

💳 COME EFFETTUARE IL PAGAMENTO
════════════════════════════════

📱 METODO 1 - QR CODE RAPIDO (CONSIGLIATO):

   1. Apri la tua app di e-banking svizzera
   2. Scansiona il QR code usando questo link:
      ${qrCodeUrl}
   3. Verifica che tutti i dati siano corretti
   4. Conferma il pagamento

💻 METODO 2 - BONIFICO MANUALE:

   1. Accedi al tuo e-banking
   2. Crea un nuovo bonifico con questi dati:
      - IBAN: ${paymentData.iban}
      - Importo: ${paymentData.currency} ${paymentData.amount}
      - Beneficiario: ${paymentData.creditor.name}
      - Riferimento: ${paymentData.reference}
      - Causale: ${paymentData.message}
   3. Controlla tutti i dati prima di inviare
   4. Conferma il pagamento

═══════════════════════════════════════════════════════════════════════════════

📋 INFORMAZIONI IMPORTANTI
═══════════════════════════

✅ CONTROLLA SEMPRE:
   • L'IBAN sia corretto: ${paymentData.iban}
   • L'importo sia esatto: ${paymentData.currency} ${paymentData.amount}
   • Il riferimento sia inserito: ${paymentData.reference}

⚠️ ATTENZIONE:
   • Non modificare l'importo
   • Il riferimento è obbligatorio per identificare il pagamento
   • Conserva la ricevuta del bonifico

🏦 TEMPISTICHE:
   • Bonifici in Svizzera: 1-2 giorni lavorativi
   • Bonifici UE: 1-3 giorni lavorativi
   • Ti contatteremo dopo aver ricevuto il pagamento

═══════════════════════════════════════════════════════════════════════════════

📞 CONTATTI E SUPPORTO
═══════════════════════

Hai domande sul pagamento?

Domenico Riccio - Web & App Solutions
📱 WhatsApp: +41 76 781 01 94
📧 Email: info@dcreativo.ch
🌐 Web: dcreativo.ch

Orari di contatto:
Lunedì - Venerdì: 9:00 - 18:00
Sabato: 9:00 - 12:00 (solo urgenze)

═══════════════════════════════════════════════════════════════════════════════

🎉 COSA SUCCEDE DOPO IL PAGAMENTO
═══════════════════════════════════

1️⃣ Confermeremo la ricezione del pagamento entro 24 ore
2️⃣ Organizzeremo il primo incontro di progetto
3️⃣ Inizieremo immediatamente lo sviluppo della PWA
4️⃣ Ti terremo aggiornata su tutti i progressi

═══════════════════════════════════════════════════════════════════════════════

📱 QR CODE PER PAGAMENTO RAPIDO
═══════════════════════════════════

Apri questo link nel browser del tuo smartphone e scansiona il QR code:
${qrCodeUrl}

Il QR code contiene tutti i dati del bonifico in formato standard svizzero,
compatibile con tutte le app di e-banking svizzere.

═══════════════════════════════════════════════════════════════════════════════

📝 DETTAGLI TECNICI QR CODE
════════════════════════════

Standard: QR-Bill Svizzero
Codifica: UTF-8
Tipo riferimento: NON (Riferimento libero)
Valuta: CHF
Verificato: Sì

═══════════════════════════════════════════════════════════════════════════════

Documento generato automaticamente il ${new Date().toLocaleDateString('it-IT')}
alle ore ${new Date().toLocaleTimeString('it-IT')}

© 2025 Domenico Riccio - Web & App Solutions
Tutti i diritti riservati.

═══════════════════════════════════════════════════════════════════════════════
    `;

    console.log('✅ Istruzioni pagamento generate con successo');
    return Buffer.from(paymentContent.trim(), 'utf8').toString('base64');

  } catch (error) {
    console.error('❌ Errore generazione istruzioni:', error);

    // Fallback semplice
    const simpleContent = `
ISTRUZIONI PAGAMENTO - CENTRO SINAPSI
===================================

DATI BONIFICO:
Beneficiario: ${paymentData.creditor.name}
IBAN: ${paymentData.iban}
Importo: ${paymentData.currency} ${paymentData.amount}
Riferimento: ${paymentData.reference}
Causale: ${paymentData.message}

CONTATTI:
Email: info@dcreativo.ch
Tel: +41 76 781 01 94

Data: ${new Date().toLocaleDateString('it-IT')}
    `;

    return Buffer.from(simpleContent.trim(), 'utf8').toString('base64');
  }
}

// 🎯 GENERA QR CODE SVIZZERO (STESSA FUNZIONE PRECEDENTE)
async function generateSwissQRCodeStable(paymentData) {
  try {
    const qrContent = [
      'SPC', '0200', '1',
      paymentData.iban.replace(/\s/g, ''),
      'K', paymentData.creditor.name, paymentData.creditor.address,
      paymentData.creditor.postalCode, paymentData.creditor.city, paymentData.creditor.country,
      '', '', '', '', '', '', '',
      paymentData.amount, paymentData.currency,
      'K', paymentData.debtor.name, paymentData.debtor.address,
      paymentData.debtor.postalCode, paymentData.debtor.city, paymentData.debtor.country,
      'NON', paymentData.reference, paymentData.message, 'EPD'
    ].join('\r\n');

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&ecc=M&data=${encodeURIComponent(qrContent)}`;

    console.log('✅ QR Code URL generato');
    return qrUrl;

  } catch (error) {
    console.error('⚠️ Errore QR code, uso fallback:', error);
    const simpleData = `IBAN:${paymentData.iban}|AMOUNT:${paymentData.currency} ${paymentData.amount}|REF:${paymentData.reference}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(simpleData)}`;
  }
}
