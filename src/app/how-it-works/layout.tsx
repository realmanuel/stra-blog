import type { Metadata } from 'next'

const BASE_URL = 'https://www.geArk.ng' //change this to your actual base URL

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how Ark works for buyers and sellers in Nigeria. Escrow payments, video verification, and rider delivery | safe secondhand commerce in 3 simple steps.',
  alternates: {
    canonical: `${BASE_URL}/how-it-works`,
  },
  openGraph: {
    title: 'How Ark Works | Buy & Sell Safely in Nigeria',
    description:
      'Escrow payments, video verification, and rider delivery. See exactly how Ark protects every transaction.',
    url: `${BASE_URL}/how-it-works`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How Ark Works' }],
  },
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}