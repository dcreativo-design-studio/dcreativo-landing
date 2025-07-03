// api/test-email.js - Endpoint per testare la configurazione email
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Test configurazione email...');

    // Verifica variabili d'ambiente
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Variabili EMAIL_USER o EMAIL_PASS mancanti');
    }

    // Crea transporter (CORRETTO: createTransport)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test connessione
    await transporter.verify();
    console.log('✅ Configurazione email valida');

    // Invia email di test
    const result = await transporter.sendMail({
      from: `"Test Centro Sinapsi" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Invia a se stesso
      subject: '🧪 Test Email API - Centro Sinapsi',
      html: `
        <h2>🎉 Test Email Funzionante!</h2>
        <p>La configurazione Nodemailer funziona correttamente.</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('it-IT')}</p>
        <p><strong>Server:</strong> Vercel Function</p>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Email di test inviata con successo!',
      messageId: result.messageId,
      config: {
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASS
      }
    });

  } catch (error) {
    console.error('❌ Errore test email:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString()
    });
  }
}
