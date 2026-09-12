import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { FarmerProvider } from '@/context/FarmerContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crop Health Assistant | Simple crop care for every field',
  description: 'Monitor crop health, understand weather risk, and take clear action with Crop Health Assistant.',
  generator: 'Crop Health Assistant',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FarmerProvider>
          {children}
        </FarmerProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}