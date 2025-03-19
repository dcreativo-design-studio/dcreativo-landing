'use client';

import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { CookieConsentProvider } from '@/cookies/CookieConsentProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CookieConsentProvider>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  );
}
