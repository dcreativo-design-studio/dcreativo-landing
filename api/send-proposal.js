// api/send-proposal.js - 🚀 VERSIONE UNIVERSALE (Centro Sinapsi + F4DEZONE)
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
    // 🎯 RILEVA IL TIPO DI PROPOSTA
    const requestBody = req.body;
    const proposalType = requestBody.type || 'centro_sinapsi'; // Default Centro Sinapsi

    console.log(`🚀 Ricevuta richiesta per: ${proposalType.toUpperCase()}`);

    if (proposalType === 'f4dezone_payperuse') {
      return await handleF4dezoneProposal(req, res, requestBody);
    } else {
      return await handleCentroSinapsiProposal(req, res, requestBody);
    }

  } catch (error) {
    console.error('❌ Errore generale API:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString()
    });
  }
}

// 🏠 GESTIONE CENTRO SINAPSI (CODICE ESISTENTE)
async function handleCentroSinapsiProposal(req, res, requestBody) {
  try {
    const { signatureData, pdfBase64, pdfQuality } = requestBody;

    console.log('🏠 CENTRO SINAPSI - Processing proposal...');
    console.log('📊 Dati firma ricevuti:', {
      date: signatureData.date,
      clientIP: signatureData.clientIP,
      paymentOption: signatureData.paymentOption?.description || 'N/A'
    });

    // Pulisci PDF base64
    let cleanPdfBase64 = pdfBase64;
    if (pdfBase64.startsWith('data:')) {
      cleanPdfBase64 = pdfBase64.split(',')[1];
    }

    if (!cleanPdfBase64 || cleanPdfBase64.length < 1000) {
      throw new Error('PDF base64 non valido o troppo piccolo');
    }

    // Configurazione email
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    // Configurazione pagamento Centro Sinapsi
    const PAYMENT_CONFIG = {
      normalIBAN: 'CH71 0076 4227 8465 4200 1',
      qrIBAN: 'CH93 0076 4227 8465 4200 1',
      beneficiary: 'Domenico Riccio'
    };

    // Genera riferimento pagamento
    const timestamp = new Date().getTime();
    const paymentReference = `CS-${timestamp.toString().slice(-8)}`;
    const paymentAmount = '1920.00'; // 30% di CHF 6'400

    // Genera istruzioni pagamento
    const paymentSlipData = await generateSimplePaymentSlip({
      amount: paymentAmount,
      currency: 'CHF',
      reference: paymentReference,
      creditor: {
        name: PAYMENT_CONFIG.beneficiary,
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
      iban: PAYMENT_CONFIG.qrIBAN,
      normalIban: PAYMENT_CONFIG.normalIBAN,
      message: `Acconto 30% - Sviluppo PWA Centro Sinapsi - Servizi Domenico Riccio - Proposta firmata ${new Date().toLocaleDateString('it-IT')} - Totale CHF 6'400`
    });

    // Email templates Centro Sinapsi (USA IL CODICE ESISTENTE)
    const clientEmailHTML = generateCentroSinapsiClientEmail(signatureData, paymentReference);
    const developerEmailHTML = generateCentroSinapsiDeveloperEmail(signatureData, paymentReference);

    // Configurazione email
    const clientMailOptions = {
      from: `"Domenico Riccio" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'info@centrosinapsi.ch',
      subject: '✅ Proposta Centro Sinapsi PWA - Firmata + Istruzioni Pagamento',
      html: clientEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: cleanPdfBase64,
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

    const developerMailOptions = {
      from: `"Centro Sinapsi PWA" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'info@dcreativo.ch',
      subject: '🎉 Nuova Proposta Firmata - Centro Sinapsi + Dati Pagamento',
      html: developerEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: cleanPdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    // Invio email
    const clientResult = await transporter.sendMail(clientMailOptions);
    const developerResult = await transporter.sendMail(developerMailOptions);

    res.status(200).json({
      success: true,
      message: 'Centro Sinapsi - Email inviate con successo!',
      clientMessageId: clientResult.messageId,
      developerMessageId: developerResult.messageId,
      paymentReference: paymentReference,
      type: 'centro_sinapsi'
    });

  } catch (error) {
    console.error('❌ Errore Centro Sinapsi:', error);
    throw error;
  }
}

// ✂️ GESTIONE F4DEZONE PAY-PER-USE (NUOVO)
async function handleF4dezoneProposal(req, res, requestBody) {
  try {
    const { signatureData, pdfBase64, emailCliente, emailSviluppatore, testMode } = requestBody;

    console.log('✂️ F4DEZONE PAY-PER-USE - Processing proposal...');
    console.log('📊 Dati firma ricevuti:', {
      date: signatureData.date,
      cliente: signatureData.cliente,
      sistema: signatureData.sistema,
      partnership: signatureData.partnership,
      testMode: testMode
    });

    // Pulisci PDF base64
    let cleanPdfBase64 = pdfBase64;
    if (pdfBase64.startsWith('data:')) {
      cleanPdfBase64 = pdfBase64.split(',')[1];
    }

    if (!cleanPdfBase64 || cleanPdfBase64.length < 1000) {
      throw new Error('PDF base64 non valido o troppo piccolo');
    }

    // Configurazione email
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    // Genera riferimento unico
    const timestamp = new Date().getTime();
    const contractReference = `F4D-${timestamp.toString().slice(-8)}`;

    // Email templates F4DEZONE
    const clientEmailHTML = generateF4dezoneClientEmail(signatureData, contractReference, testMode);
    const developerEmailHTML = generateF4dezoneDeveloperEmail(signatureData, contractReference, testMode);

    // Configurazione email cliente
    const clientMailOptions = {
      from: `"Domenico Riccio - F4DEZONE" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: emailCliente,
      subject: testMode ?
        '🧪 [TEST] F4DEZONE - Sistema Pay-Per-Use Attivato!' :
        '🚀 F4DEZONE - Sistema Pay-Per-Use Attivato!',
      html: clientEmailHTML,
      attachments: [
        {
          filename: 'F4DEZONE_PayPerUse_Contratto_Firmato.pdf',
          content: cleanPdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    // Configurazione email sviluppatore
    const developerMailOptions = {
      from: `"F4DEZONE Pay-Per-Use" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: emailSviluppatore,
      subject: testMode ?
        '🧪 [TEST] Nuovo Contratto Pay-Per-Use - F4DEZONE' :
        '💰 Nuovo Contratto Pay-Per-Use - F4DEZONE',
      html: developerEmailHTML,
      attachments: [
        {
          filename: 'F4DEZONE_PayPerUse_Contratto_Firmato.pdf',
          content: cleanPdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    // Invio email
    console.log('📤 Invio email F4DEZONE...');
    console.log('📧 Cliente:', emailCliente);
    console.log('📧 Sviluppatore:', emailSviluppatore);
    console.log('🧪 Test Mode:', testMode);

    const clientResult = await transporter.sendMail(clientMailOptions);
    const developerResult = await transporter.sendMail(developerMailOptions);

    res.status(200).json({
      success: true,
      message: 'F4DEZONE Pay-Per-Use - Sistema attivato e email inviate!',
      clientMessageId: clientResult.messageId,
      developerMessageId: developerResult.messageId,
      contractReference: contractReference,
      type: 'f4dezone_payperuse',
      testMode: testMode,
      billingStart: 'Piano STARTER - CHF 89/mese'
    });

  } catch (error) {
    console.error('❌ Errore F4DEZONE:', error);
    throw error;
  }
}

// 📧 TEMPLATE EMAIL F4DEZONE CLIENTE
function generateF4dezoneClientEmail(signatureData, contractReference, testMode = false) {
  const testBanner = testMode ? `
    <tr>
      <td style="background: #9C27B0; color: #ffffff; padding: 15px; text-align: center; font-weight: bold;">
        🧪 MODALITÀ TEST ATTIVA - Questa è un'email di prova
      </td>
    </tr>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>F4DEZONE - Sistema Pay-Per-Use Attivato</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5;">
      <table role="presentation" style="width: 100%; margin: 0; padding: 20px 0; background-color: #f0f2f5;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0" border="0">

              ${testBanner}

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; padding: 30px 25px; text-align: center;">
                  <div style="font-size: 48px; margin-bottom: 15px;">✂️</div>
                  <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">F4DEZONE</h1>
                  <p style="margin: 0 0 15px 0; font-size: 16px; opacity: 0.95;">Sistema Pay-Per-Use Attivato!</p>
                  <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block;">
                    Piano STARTER • CHF 89/mese • 0-100 prenotazioni
                  </div>
                </td>
              </tr>

              <!-- Success Banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: #ffffff; padding: 20px; text-align: center;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🎉</div>
                  <h2 style="margin: 0 0 5px 0; font-size: 18px; font-weight: 600;">Sistema Attivato con Successo!</h2>
                  <p style="margin: 0; font-size: 14px; opacity: 0.95;">La tua app F4DEZONE è ora operativa con billing automatico</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 35px 25px;">
                  <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #FF6B35;">Ciao Santiago! 👋</h3>

                  <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                    Il tuo sistema pay-per-use è ora <strong>attivo e operativo</strong>! L'app F4DEZONE inizierà subito a tracciare le prenotazioni e fatturerà automaticamente in base all'utilizzo reale.
                  </p>

                  <!-- Sistema Pay-Per-Use Box -->
                  <table role="presentation" style="width: 100%; background: #f7f8fa; border: 1px solid #e4e6ea; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #FF6B35;">🚀 Il Tuo Sistema Pay-Per-Use:</h4>
                        <table role="presentation" style="width: 100%;" cellpadding="0" cellspacing="0" border="0">
                          <tr><td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Piano iniziale:</strong> STARTER (CHF 89/mese)</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Limite prenotazioni:</strong> 0-100 al mese</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Data attivazione:</strong> ${signatureData.date}</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Contratto:</strong> ${contractReference}</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Fatturazione:</strong> Automatica mensile con Stripe</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Partnership Box -->
                  <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #2c5aa0 0%, #1e4080 100%); color: #ffffff; border-radius: 12px; margin: 30px 0;" cellpadding="25" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <div style="text-align: center; margin-bottom: 20px;">
                          <div style="font-size: 32px; margin-bottom: 8px;">🤝</div>
                          <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">Partnership Completa</h3>
                          <p style="margin: 0; font-size: 14px; opacity: 0.95;">Servizi digitali inclusi nella collaborazione</p>
                        </div>

                        <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 8px;">
                          <h4 style="margin: 0 0 15px 0; font-size: 16px;">🎯 Servizi Inclusi:</h4>
                          <p style="margin: 5px 0; font-size: 14px;">✂️ <strong>1 taglio completo/mese</strong> in cambio di design e poster</p>
                          <p style="margin: 5px 0; font-size: 14px;">📧 <strong>Setup Gmail Business</strong> con account professionale</p>
                          <p style="margin: 5px 0; font-size: 14px;">🗺️ <strong>Google Business Profile</strong> ottimizzato</p>
                          <p style="margin: 5px 0; font-size: 14px;">🎯 <strong>Google Ads Setup</strong> con campagne</p>
                          <p style="margin: 5px 0; font-size: 14px;">📸 <strong>Foto professionali</strong> barbers + ambiente</p>
                          <p style="margin: 5px 0; font-size: 14px;">🎬 <strong>Video promozionali</strong> barbershop</p>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Piani Dinamici -->
                  <table role="presentation" style="width: 100%; background: #e3f2fd; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">📈 Crescita Automatica:</h4>
                        <p style="margin: 5px 0; font-size: 13px;">🌱 <strong>STARTER:</strong> CHF 89/mese (0-100 prenotazioni)</p>
                        <p style="margin: 5px 0; font-size: 13px;">🚀 <strong>BUSINESS:</strong> CHF 149/mese (101-300 prenotazioni)</p>
                        <p style="margin: 5px 0; font-size: 13px;">💎 <strong>PREMIUM:</strong> CHF 249/mese (301-1000 prenotazioni)</p>
                        <p style="margin: 5px 0; font-size: 13px;">🏆 <strong>ENTERPRISE:</strong> CHF 0.25 per prenotazione oltre le 1000</p>
                        <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;"><strong>L'upgrade è automatico quando superi i limiti del piano corrente</strong></p>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                    <strong>Cosa succede ora:</strong><br>
                    1. L'app traccia automaticamente tutte le prenotazioni<br>
                    2. Riceverai report mensili dettagliati<br>
                    3. La fatturazione avviene automaticamente via Stripe<br>
                    4. Iniziamo subito con i servizi della partnership
                  </p>

                  <!-- Contact Info -->
                  <table role="presentation" style="width: 100%; background: #f7f8fa; border-radius: 8px; margin: 25px 0;" cellpadding="25" cellspacing="0" border="0">
                    <tr>
                      <td style="text-align: center;">
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #1c1e21;">📞 Domenico Riccio</h4>
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
                  <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #FF6B35;">F4DEZONE Pay-Per-Use</h3>
                  <p style="margin: 0 0 15px 0; font-size: 13px; opacity: 0.8;">Sistema di billing intelligente by Domenico Riccio</p>
                  <p style="margin: 0; font-size: 12px; opacity: 0.6;">Cresci e paga solo quello che usi • Scalabilità automatica</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// 📧 TEMPLATE EMAIL F4DEZONE SVILUPPATORE
function generateF4dezoneDeveloperEmail(signatureData, contractReference, testMode = false) {
  const testBanner = testMode ? `
    <tr>
      <td style="background: #9C27B0; color: #ffffff; padding: 15px; text-align: center; font-weight: bold;">
        🧪 MODALITÀ TEST ATTIVA - Contratto di prova
      </td>
    </tr>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuovo Contratto Pay-Per-Use - F4DEZONE</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5;">
      <table role="presentation" style="width: 100%; margin: 0; padding: 20px 0; background-color: #f0f2f5;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0" border="0">

              ${testBanner}

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: #ffffff; padding: 30px 25px; text-align: center;">
                  <div style="font-size: 48px; margin-bottom: 15px;">💰</div>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700;">NUOVO CONTRATTO PAY-PER-USE!</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">F4DEZONE BARBERS - Santiago Prat</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 35px 25px;">
                  <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #333;">
                    <strong>Santiago Prat di F4DEZONE BARBERS</strong> ha appena firmato il contratto pay-per-use.
                  </p>

                  <!-- Alert Box -->
                  <table role="presentation" style="width: 100%; background: #FF6B35; color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h3 style="margin: 0 0 10px 0; font-size: 18px;">✂️ SISTEMA ATTIVATO:</h3>
                        <p style="margin: 0; font-size: 15px;">Il billing automatico F4DEZONE è ora operativo. Piano iniziale: STARTER (CHF 89/mese).</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Details Table -->
                  <table role="presentation" style="width: 100%; background: #f7f8fa; border: 1px solid #e4e6ea; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">📋 Dettagli Contratto:</h4>
                        <table role="presentation" style="width: 100%;" cellpadding="0" cellspacing="0" border="0">
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Cliente:</strong> F4DEZONE BARBERS - Santiago Prat</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Data firma:</strong> ${signatureData.date}</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Sistema:</strong> ${signatureData.sistema}</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Contratto:</strong> ${contractReference}</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Partnership:</strong> ${signatureData.partnership}</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>IP cliente:</strong> ${signatureData.clientIP}</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 14px;"><strong>Test Mode:</strong> ${testMode ? 'ATTIVO' : 'DISATTIVO'}</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Billing Info -->
                  <table role="presentation" style="width: 100%; background: #e3f2fd; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">💳 Billing Automatico:</h4>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Piano attuale:</strong> STARTER - CHF 89/mese</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Limite:</strong> 0-100 prenotazioni/mese</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Fatturazione:</strong> Automatica mensile con Stripe</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Upgrade:</strong> Automatico quando supera i limiti</p>
                        <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>Nota:</strong> Revenue sharing iniziato!</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Partnership Details -->
                  <table role="presentation" style="width: 100%; background: #fff3cd; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #ff6b35;">🤝 Partnership Attiva:</h4>
                        <p style="margin: 5px 0; font-size: 14px;">✂️ <strong>1 taglio completo/mese</strong> per design e poster</p>
                        <p style="margin: 5px 0; font-size: 14px;">📧 <strong>Setup Gmail Business</strong> completare</p>
                        <p style="margin: 5px 0; font-size: 14px;">🗺️ <strong>Google Business Profile</strong> ottimizzare</p>
                        <p style="margin: 5px 0; font-size: 14px;">🎯 <strong>Google Ads Setup</strong> configurare</p>
                        <p style="margin: 5px 0; font-size: 14px;">📸 <strong>Foto barbers</strong> programmare</p>
                        <p style="margin: 5px 0; font-size: 14px;">🎬 <strong>Video barbershop</strong> pianificare</p>
                        <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>Azione:</strong> Pianificare i servizi della partnership</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Contact Info -->
                  <table role="presentation" style="width: 100%; background: #e3f2fd; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 15px 0; font-size: 16px; color: #2c5aa0;">📞 Contatti Cliente:</h4>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Santiago Prat</strong></p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Tel:</strong> +41 78 930 15 99</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Barbershop:</strong> Via Zurigo 2, 6900 Lugano</p>
                        <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>Allegato:</strong> Contratto firmato PDF</p>
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
}

// 📧 TEMPLATE EMAIL CENTRO SINAPSI (CODICE ESISTENTE ACCORCIATO)
function generateCentroSinapsiClientEmail(signatureData, paymentReference) {
  // USA IL TEMPLATE ESISTENTE DALL'API ORIGINALE
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Proposta Centro Sinapsi Firmata</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
      <h1>Centro Sinapsi - Proposta Firmata</h1>
      <p>Grazie per aver firmato la proposta PWA Centro Sinapsi.</p>
      <p><strong>Data:</strong> ${signatureData.date}</p>
      <p><strong>Riferimento pagamento:</strong> ${paymentReference}</p>
      <p><strong>Acconto richiesto:</strong> CHF 1'920</p>
      <p>Troverai le istruzioni di pagamento nel file allegato.</p>
    </body>
    </html>
  `;
}

function generateCentroSinapsiDeveloperEmail(signatureData, paymentReference) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Nuova Proposta Firmata - Centro Sinapsi</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
      <h1>PROPOSTA FIRMATA - Centro Sinapsi</h1>
      <p>Nuova proposta firmata da Shote del Centro Sinapsi.</p>
      <p><strong>Data:</strong> ${signatureData.date}</p>
      <p><strong>Riferimento:</strong> ${paymentReference}</p>
      <p><strong>Acconto:</strong> CHF 1'920</p>
      <p>Contattare la cliente entro 24 ore.</p>
    </body>
    </html>
  `;
}

// 🏦 FUNZIONI PAGAMENTO CENTRO SINAPSI (CODICE ESISTENTE)
async function generateSimplePaymentSlip(paymentData) {
  try {
    const qrCodeUrl = await generateSwissQRCodeStable(paymentData);

    const paymentContent = `
ISTRUZIONI PAGAMENTO - CENTRO SINAPSI
====================================

DATI BONIFICO:
Beneficiario: ${paymentData.creditor.name}
IBAN: ${paymentData.normalIban || paymentData.iban}
Importo: ${paymentData.currency} ${paymentData.amount}
Riferimento: ${paymentData.reference}
Causale: ${paymentData.message}

QR CODE:
${qrCodeUrl}

CONTATTI:
Email: info@dcreativo.ch
Tel: +41 76 781 01 94

Data: ${new Date().toLocaleDateString('it-IT')}
    `;

    return Buffer.from(paymentContent.trim(), 'utf8').toString('base64');
  } catch (error) {
    console.error('❌ Errore generazione istruzioni:', error);
    return Buffer.from('Errore generazione istruzioni pagamento', 'utf8').toString('base64');
  }
}

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

    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&ecc=M&data=${encodeURIComponent(qrContent)}`;
  } catch (error) {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ERROR';
  }
}
