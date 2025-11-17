import ClientLayout from '@/components/frontend/layout/ClientLayout'
import type { Metadata } from 'next'
import Script from 'next/script'

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
    <>
      <link rel="stylesheet" href="/css/styles.css" />
      <Script
        id="color-scheme"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: setColorSchemeScript }}
      />
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}
