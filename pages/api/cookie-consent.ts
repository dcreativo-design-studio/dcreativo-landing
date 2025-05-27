// api/cookie-consent.ts (Next.js API route)
import { NextApiRequest, NextApiResponse } from 'next';

interface ConsentData {
  timestamp: string;
  settings: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  };
  userAgent: string;
  ip: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const consentData: ConsentData = req.body;

    // Salva nel database o log file per compliance
    console.log('Cookie consent logged:', consentData);

    // Opzionale: salva in database
    // await saveConsentToDatabase(consentData);

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
