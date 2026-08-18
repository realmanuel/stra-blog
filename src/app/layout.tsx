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
    default: 'Ark Blog | Stories, Updates & Spotlights',
    template: '%s | Ark Blog',
  },

  description:
    'The official Ark publication. Platform updates, product spotlights, seller stories, marketplace insights, and everything happening inside Nigeria\'s smartest secondhand market.',

  keywords: [
    'Ark blog',
    'Ark Journal',
    'Nigeria marketplace news',
    'secondhand market Nigeria',
    'seller stories Nigeria',
    'Ark updates',
    'buy sell Nigeria tips',
  ],

  authors: [{ name: 'Ark Blog', url: BASE_URL }],
  creator: 'Ark',
  publisher: 'Ark',

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
    siteName: 'Ark Blog',
    title: 'Ark Blog | Stories, Updates & Spotlights',
    description:
      'The official Ark publication. Platform updates, product spotlights, seller stories and marketplace insights.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ark Blog',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@Arkmarketng',
    creator: '@Arkmarketng',
    title: 'Ark Blog | Stories, Updates & Spotlights',
    description:
      'The official Ark publication. Platform updates, product spotlights, seller stories and marketplace insights.',
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