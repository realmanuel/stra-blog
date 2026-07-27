import type { Metadata } from 'next'

const BASE_URL = 'https://www.gestra.ng'

export const metadata: Metadata = {
  title: 'Trust & Safety',
  description:
    'Stra combines verification systems, AI-assisted checks, secure escrow payments, and human review to protect every buyer and seller on the platform.',
  alternates: { canonical: `${BASE_URL}/trust` },
  openGraph: {
    title: 'Trust & Safety | Stra',
    description: 'How Stra protects buyers and sellers on Nigeria\'s smartest secondhand marketplace.',
    url: `${BASE_URL}/trust`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stra Trust & Safety' }],
  },
}

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}