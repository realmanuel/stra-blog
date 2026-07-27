    import type { Metadata } from 'next'

    const BASE_URL = 'https://www.gestra.ng'

    export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Learn how Stra collects, uses, stores, and protects your personal information when you use Nigeria\'s smartest secondhand marketplace.',
    alternates: { canonical: `${BASE_URL}/privacy` },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Privacy Policy | Stra',
        description: 'How Stra handles your personal information.',
        url: `${BASE_URL}/privacy`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stra Privacy Policy' }],
    },
    }

    export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
    }