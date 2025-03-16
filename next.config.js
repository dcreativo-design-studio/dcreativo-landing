/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com'], // Aggiungi domini per immagini esterne se necessario
      formats: ['image/avif', 'image/webp'],
    },
    // Ottimizzazione per la produzione
    experimental: {
      optimizeCss: true,
      scrollRestoration: true,
    },
    // Configurazione headers per sicurezza e performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
    // Configurazione redirects
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };

  module.exports = nextConfig;
