import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Metadata } from 'next';
import { Fira_Code, Inter, Montserrat } from 'next/font/google';
import './globals.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabinet-grotesk',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'DCreativo | Web Developer & Digital Solutions',
    template: '%s | DCreativo',
  },
  description: 'Sviluppo sistemi web intelligenti e automatizzati. Soluzioni React, Node.js e Next.js personalizzate per la tua attività.',
  keywords: ['React', 'Next.js', 'Node.js', 'Sviluppo Web', 'Sistemi Automatizzati', 'Prenotazione Online', 'Freelancer', 'Switzerland'],
  authors: [{ name: 'DCreativo' }],
  creator: 'DCreativo',
  publisher: 'DCreativo',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://dcreativo.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://dcreativo.ch',
    title: 'DCreativo | Web Developer & Digital Solutions',
    description: 'Soluzioni web intelligenti e automatizzate sviluppate con React, Node.js e Next.js',
    siteName: 'DCreativo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCreativo | Web Developer & Digital Solutions',
    description: 'Soluzioni web intelligenti e automatizzate sviluppate con React, Node.js e Next.js',
    creator: '@dcreativo',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${firaCode.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
