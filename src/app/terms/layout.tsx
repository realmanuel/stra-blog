import type { Metadata } from 'next'

const BASE_URL = 'https://www.gestra.ng'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Read the Stra platform rules and terms of use. Understand your rights and responsibilities as a buyer or seller on Nigeria\'s smartest secondhand marketplace.',
  alternates: { canonical: `${BASE_URL}/terms` },
  openGraph: {
    title: 'Terms of Use | Stra',
    description: 'Platform rules and terms governing your use of Stra.',
    url: `${BASE_URL}/terms`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stra Terms of Use' }],
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}