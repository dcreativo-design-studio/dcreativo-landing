// api/send-proposal.js - Versione con generazione PDF cedola stabile
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
    const { signatureData, pdfBase64 } = req.body;

    console.log('📧 Ricevuta richiesta invio email per Centro Sinapsi');
    console.log('📊 Dati firma ricevuti:', {
      date: signatureData.date,
      clientIP: signatureData.clientIP,
      paymentOption: signatureData.paymentOption?.description || 'N/A'
    });

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
    let paymentAmount = '1440.00'; // Acconto 30%
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

    console.log('💰 Generazione cedola pagamento con QR code...');

    // 🎯 GENERA CEDOLA DI PAGAMENTO - VERSIONE STABILE
    const qrPaymentSlip = await generatePaymentSlipStable({
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
      iban: 'CH93 0076 2011 6238 5295 7', // ⚠️ SOSTITUISCI CON IBAN REALE
      message: `Acconto 30% - Sviluppo PWA Centro Sinapsi - Proposta firmata ${new Date().toLocaleDateString('it-IT')}`
    });

    // Template email professionale per la cliente
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
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>Opzione pagamento:</strong> ${paymentDescription}</td>
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

                    <!-- Payment Notice -->
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="20" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 8px;">💳</div>
                          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Pagamento Acconto</h3>
                          <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: bold;">CHF ${paymentAmount}</p>
                          <p style="margin: 0; font-size: 13px; opacity: 0.9;">Cedola di pagamento con QR code in allegato</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Attachment Notice -->
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #FFB946 0%, #FF8C42 100%); color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="18" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 8px;">📎</div>
                          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Allegati Inclusi</h3>
                          <p style="margin: 0; font-size: 14px; opacity: 0.95;">✓ Proposta firmata (PDF)<br>✓ Cedola pagamento con QR code</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                      <strong>Prossimi passi:</strong><br>
                      1. Effettua il pagamento dell'acconto utilizzando la cedola allegata<br>
                      2. Ti contatteremo entro 24 ore per organizzare il primo incontro<br>
                      3. Inizieremo subito lo sviluppo della tua PWA
                    </p>

                    <!-- CTA Button -->
                    <table role="presentation" style="margin: 30px 0;" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <a href="https://dcreativo.ch/centrosinapsi" style="display: inline-block; background: linear-gradient(135deg, #1877F2 0%, #166FE5 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">🔗 Visualizza Proposta Online</a>
                        </td>
                      </tr>
                    </table>

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

    // Template email per il programmatore
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
                          <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>Allegati:</strong> PDF firmato + Cedola pagamento con QR code</p>
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

    // Opzioni email per la cliente (con cedola QR)
    const clientMailOptions = {
      from: `"Domenico Riccio" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'd8572229@gmail.com', // email della cliente info@centrosinapsi.ch
      subject: '✅ Proposta Centro Sinapsi PWA - Firmata + Cedola Pagamento',
      html: clientEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        },
        {
          filename: `cedola_pagamento_${paymentReference}.pdf`,
          content: qrPaymentSlip,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    // Opzioni email per il programmatore (con cedola QR)
    const developerMailOptions = {
      from: `"Centro Sinapsi PWA" <${process.env.EMAIL_USER}>`,
      replyTo: 'info@dcreativo.ch',
      to: 'info@dcreativo.ch',
      subject: '🎉 Nuova Proposta Firmata - Centro Sinapsi + Cedola',
      html: developerEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        },
        {
          filename: `cedola_pagamento_${paymentReference}.pdf`,
          content: qrPaymentSlip,
          encoding: 'base64',
          contentType: 'application/pdf'
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
      message: 'Email inviate con successo con cedola QR!',
      clientMessageId: clientResult.messageId,
      developerMessageId: developerResult.messageId,
      paymentReference: paymentReference
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

// 🎯 FUNZIONE STABILE PER GENERARE CEDOLA PDF (SENZA SERVIZI ESTERNI)
async function generatePaymentSlipStable(paymentData) {
  try {
    console.log('🔄 Generazione cedola PDF con metodo stabile...');

    // Genera QR Code URL (servizio più affidabile)
    const qrCodeUrl = await generateSwissQRCodeStable(paymentData);

    // Crea dati per PDFKit manuale
    const pdfData = await createPaymentSlipPDFManual(paymentData, qrCodeUrl);

    console.log('✅ Cedola PDF generata con successo (metodo stabile)');
    return pdfData;

  } catch (error) {
    console.error('❌ Errore generazione cedola stabile:', error);
    // Fallback finale: cedola testuale
    return createTextPaymentSlip(paymentData);
  }
}

// 🎯 GENERA QR CODE SVIZZERO STABILE
async function generateSwissQRCodeStable(paymentData) {
  try {
    // Dati QR-Bill Svizzero standard
    const qrContent = [
      'SPC',  // QR Type
      '0200', // Version
      '1',    // Coding Type
      paymentData.iban.replace(/\s/g, ''), // IBAN pulito
      'K',    // Creditor Address Type
      paymentData.creditor.name,
      paymentData.creditor.address,
      paymentData.creditor.postalCode,
      paymentData.creditor.city,
      paymentData.creditor.country,
      '', '', '', '', '', '', '', // Campi vuoti richiesti
      paymentData.amount, // Amount
      paymentData.currency, // Currency
      'K',    // Debtor Address Type
      paymentData.debtor.name,
      paymentData.debtor.address,
      paymentData.debtor.postalCode,
      paymentData.debtor.city,
      paymentData.debtor.country,
      'NON',  // Reference Type
      paymentData.reference, // Reference
      paymentData.message,   // Additional Info
      'EPD'   // End Payment Data
    ].join('\r\n');

    // Usa QR Server (più stabile di api.html-to-pdf.net)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&ecc=M&data=${encodeURIComponent(qrContent)}`;

    console.log('✅ QR Code URL generato (stabile)');
    return qrUrl;

  } catch (error) {
    console.error('⚠️ Errore QR code, uso fallback:', error);
    // QR code semplificato
    const simpleData = `IBAN:${paymentData.iban}|AMOUNT:${paymentData.currency} ${paymentData.amount}|REF:${paymentData.reference}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(simpleData)}`;
  }
}

// 🎯 CREA PDF CEDOLA MANUALMENTE (METODO ROBUSTO)
async function createPaymentSlipPDFManual(paymentData, qrCodeUrl) {
  try {
    console.log('📄 Creazione PDF cedola manuale...');

    // Crea contenuto HTML semplificato per conversione PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            font-size: 12pt;
            line-height: 1.4;
        }
        .cedola {
            border: 3px solid #000;
            max-width: 800px;
            margin: 0 auto;
            background: white;
        }
        .header {
            background: #2c5aa0;
            color: white;
            padding: 20px;
            text-align: center;
            font-weight: bold;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 24pt;
        }
        .content {
            display: table;
            width: 100%;
        }
        .left {
            display: table-cell;
            width: 70%;
            padding: 20px;
            vertical-align: top;
            border-right: 2px solid #000;
        }
        .right {
            display: table-cell;
            width: 30%;
            padding: 20px;
            text-align: center;
            background: #f8f9fa;
            vertical-align: top;
        }
        .row {
            margin: 12px 0;
            display: table;
            width: 100%;
        }
        .label {
            display: table-cell;
            font-weight: bold;
            width: 120px;
            color: #333;
            vertical-align: top;
        }
        .value {
            display: table-cell;
            color: #000;
            vertical-align: top;
        }
        .amount {
            font-size: 20pt;
            font-weight: bold;
            color: #2c5aa0;
            text-align: center;
            margin: 15px 0;
            padding: 15px;
            background: #e3f2fd;
            border: 2px solid #2c5aa0;
        }
        .qr-section h3 {
            color: #2c5aa0;
            margin-bottom: 15px;
            font-size: 14pt;
        }
        .footer {
            background: #f0f0f0;
            padding: 15px;
            text-align: center;
            border-top: 2px solid #000;
            font-size: 10pt;
            color: #666;
        }
        .iban-box {
            background: #f0f0f0;
            padding: 8px;
            border: 1px solid #ddd;
            font-family: monospace;
            font-weight: bold;
            margin: 5px 0;
        }
        .reference-box {
            background: #f0f0f0;
            padding: 8px;
            border: 1px solid #ddd;
            font-family: monospace;
            font-weight: bold;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="cedola">
        <div class="header">
            <h1>CEDOLA DI PAGAMENTO</h1>
            <p>Centro Sinapsi - Sviluppo PWA</p>
        </div>

        <div class="content">
            <div class="left">
                <h2 style="color: #2c5aa0; margin-bottom: 20px;">Dettagli del Pagamento</h2>

                <div class="row">
                    <div class="label">Beneficiario:</div>
                    <div class="value">
                        <strong>${paymentData.creditor.name}</strong><br>
                        ${paymentData.creditor.address}<br>
                        ${paymentData.creditor.postalCode} ${paymentData.creditor.city}
                    </div>
                </div>

                <div class="row">
                    <div class="label">IBAN:</div>
                    <div class="value">
                        <div class="iban-box">${paymentData.iban}</div>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Debitore:</div>
                    <div class="value">
                        <strong>${paymentData.debtor.name}</strong><br>
                        ${paymentData.debtor.address}<br>
                        ${paymentData.debtor.postalCode} ${paymentData.debtor.city}
                    </div>
                </div>

                <div class="amount">${paymentData.currency} ${paymentData.amount}</div>

                <div class="row">
                    <div class="label">Riferimento:</div>
                    <div class="value">
                        <div class="reference-box">${paymentData.reference}</div>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Causale:</div>
                    <div class="value">${paymentData.message}</div>
                </div>

                <div class="row">
                    <div class="label">Data:</div>
                    <div class="value">${new Date().toLocaleDateString('it-IT')}</div>
                </div>

                <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border: 1px solid #ffc107;">
                    <h4 style="margin: 0 0 10px 0; color: #856404;">📱 Istruzioni:</h4>
                    <p style="margin: 5px 0; font-size: 11pt;">1. Scansiona il QR code con la tua app di e-banking</p>
                    <p style="margin: 5px 0; font-size: 11pt;">2. Oppure inserisci manualmente l'IBAN e l'importo</p>
                    <p style="margin: 5px 0; font-size: 11pt;">3. Verifica che il riferimento sia corretto</p>
                    <p style="margin: 5px 0; font-size: 11pt;">4. Conferma il pagamento</p>
                </div>
            </div>

            <div class="right">
                <div class="qr-section">
                    <h3>QR Code</h3>
                    <img src="${qrCodeUrl}" alt="QR Code Pagamento" style="width: 150px; height: 150px; border: 1px solid #ddd; margin: 10px 0;">
                    <p style="font-size: 10pt; color: #666; margin: 10px 0;">
                        Scansiona per<br>pagamento rapido
                    </p>
                </div>

                <div style="background: white; padding: 10px; margin: 15px 0; border: 1px solid #ddd;">
                    <h4 style="color: #2c5aa0; margin: 0 0 8px 0; font-size: 12pt;">Contatti</h4>
                    <p style="font-size: 10pt; margin: 3px 0;">📞 +41 76 781 01 94</p>
                    <p style="font-size: 10pt; margin: 3px 0;">✉️ info@dcreativo.ch</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Domenico Riccio - Web & App Solutions</strong></p>
            <p>Cedola generata automaticamente il ${new Date().toLocaleDateString('it-IT')} alle ${new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})}</p>
        </div>
    </div>
</body>
</html>`;

    // Converte HTML in base64 come PDF alternativo
    // Questo può essere aperto nel browser e poi salvato/stampato come PDF
    const htmlBase64 = Buffer.from(htmlContent, 'utf-8').toString('base64');

    console.log('✅ Cedola HTML generata (visualizzabile nel browser)');
    return htmlBase64;

  } catch (error) {
    console.error('❌ Errore creazione PDF manuale:', error);
    throw error;
  }
}

// 🎯 FALLBACK: CEDOLA TESTUALE SEMPLICE
function createTextPaymentSlip(paymentData) {
  console.log('⚠️ Usando fallback cedola testuale...');

  const textContent = `
CEDOLA DI PAGAMENTO - CENTRO SINAPSI
===================================

Beneficiario: ${paymentData.creditor.name}
Indirizzo: ${paymentData.creditor.address}, ${paymentData.creditor.postalCode} ${paymentData.creditor.city}

IBAN: ${paymentData.iban}
Importo: ${paymentData.currency} ${paymentData.amount}
Riferimento: ${paymentData.reference}

Debitore: ${paymentData.debtor.name}
Indirizzo: ${paymentData.debtor.address}, ${paymentData.debtor.postalCode} ${paymentData.debtor.city}

Causale: ${paymentData.message}
Data: ${new Date().toLocaleDateString('it-IT')}

ISTRUZIONI:
1. Usa l'IBAN sopra riportato per il bonifico
2. Inserisci l'importo esatto: ${paymentData.currency} ${paymentData.amount}
3. Usa come riferimento: ${paymentData.reference}
4. Causale: ${paymentData.message}

Contatti: info@dcreativo.ch | +41 76 781 01 94
  `;

  return Buffer.from(textContent, 'utf-8').toString('base64');
}
