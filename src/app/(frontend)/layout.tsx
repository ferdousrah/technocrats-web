import ClientLayout from '@/components/frontend/layout/ClientLayout'
import AnalyticsTracker from '@/components/frontend/analytics/AnalyticsTracker'
import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Technocrats - AI & ML Development Company',
  description: 'Leading AI and ML development, AI agent development, business automation, and custom software solutions',
}

const setColorSchemeScript = `
(function() {
  try {
    var scheme = localStorage.getItem('color-scheme') || 'light';
    document.documentElement.setAttribute('color-scheme', scheme);
  } catch(e) {}
})();
`

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="no-touch">
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
        <Script
          id="color-scheme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: setColorSchemeScript }}
        />
      </head>
      <body>
        <AnalyticsTracker />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
