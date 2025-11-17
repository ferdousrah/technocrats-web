import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technocrats - AI & ML Development Company',
  description: 'Leading provider of AI, ML, and custom software development solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
