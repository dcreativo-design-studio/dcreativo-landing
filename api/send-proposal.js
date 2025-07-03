// api/send-proposal.js
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
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // timm81379@gmail.com
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // Verifica configurazione
    await transporter.verify();
    console.log('✅ Configurazione email verificata');

    // Prepara descrizione pagamento
    let paymentDescription = 'Opzione selezionata';
    let totalAmount = 'CHF 4\'800+';

    if (signatureData.paymentOption && signatureData.paymentOption.description) {
      paymentDescription = signatureData.paymentOption.description;
      totalAmount = signatureData.paymentOption.total || totalAmount;

      if (signatureData.paymentOption.details) {
        paymentDescription += ' - ' + signatureData.paymentOption.details;
      }
    }

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
                              <td style="padding: 8px 0; font-size: 14px; color: #333;"><strong>IP:</strong> ${signatureData.clientIP}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Attachment Notice -->
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #FFB946 0%, #FF8C42 100%); color: #ffffff; border-radius: 8px; margin: 25px 0;" cellpadding="18" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 8px;">📎</div>
                          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">Proposta Firmata in Allegato</h3>
                          <p style="margin: 0; font-size: 14px; opacity: 0.95;">PDF pronto per la stampa</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 20px 0; font-size: 15px; line-height: 1.6; color: #333;">
                      Ti contatteremo entro 24 ore per organizzare il primo incontro e l'acconto.
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

    // Template email per il programmatore (più tecnico)
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
                          <p style="margin: 0; font-size: 15px;">Contattare la cliente entro 24 ore per organizzare il primo incontro e l'acconto.</p>
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
                          <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;"><strong>PDF firmato in allegato.</strong></p>
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

    // Opzioni email per la cliente
    const clientMailOptions = {
      from: `"Domenico Riccio" <${process.env.EMAIL_USER}>`, // Usa l'email Gmail autenticata
      replyTo: 'info@dcreativo.ch', // Reply-to professionale
      to: 'd8572229@gmail.com', // email della cliente info@centrosinapsi.ch
      subject: '✅ Proposta Centro Sinapsi PWA - Firmata Digitalmente',
      html: clientEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    // Opzioni email per il programmatore
    const developerMailOptions = {
      from: `"Centro Sinapsi PWA" <${process.env.EMAIL_USER}>`, // Usa l'email Gmail autenticata
      replyTo: 'info@dcreativo.ch', // Reply-to professionale
      to: 'info@dcreativo.ch',
      subject: '🎉 Nuova Proposta Firmata - Centro Sinapsi',
      html: developerEmailHTML,
      attachments: [
        {
          filename: 'proposta_centro_sinapsi_firmata.pdf',
          content: pdfBase64,
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
      message: 'Email inviate con successo!',
      clientMessageId: clientResult.messageId,
      developerMessageId: developerResult.messageId
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
