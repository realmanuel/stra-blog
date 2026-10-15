import type { Metadata, Viewport } from 'next'
import { Syne, DM_Mono, Instrument_Serif } from 'next/font/google'
import BlogCursor from '@/components/BlogCursor'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const BASE_URL = 'https://blog.geArk.ng'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

    title: {
      default: 'Tech Notes | Software, Data & Digital Innovation',
      template: '%s | Tech Notes',
    },

    description:
      'A personal technology journal covering digital innovation, full-stack development, data engineering, software insights, and honest opinions.',

    keywords: [
      'technology',
      'digital innovation',
      'full-stack development',
      'data analytics',
      'data engineering',
      'software insights',
    ],

    authors: [{ name: 'Tech Notes', url: BASE_URL }],
    creator: 'Tech Notes',
    publisher: 'Tech Notes',

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

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: BASE_URL,
    siteName: 'Tech Notes',
    title: 'Tech Notes | Software, Data & Digital Innovation',
    description:
      'A personal technology journal covering software, data, digital innovation, and lessons from building.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tech Notes',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tech Notes | Software, Data & Digital Innovation',
    description:
      'A personal technology journal covering software, data, digital innovation, and lessons from building.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  // themeColor: '#030305',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        
        <BlogCursor />
        {children}
        
      </body>
    </html>
  )
}