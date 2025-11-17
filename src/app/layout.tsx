import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Technocrats - AI & ML Development Company',
  description: 'Leading provider of AI, ML, and custom software development solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="no-touch">
      <body>{children}</body>
    </html>
  )
}
