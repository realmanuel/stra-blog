    import type { Metadata } from 'next'

    const BASE_URL = 'https://www.geArk.ng'

    export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Learn how Ark collects, uses, stores, and protects your personal information when you use Nigeria\'s smartest secondhand marketplace.',
    alternates: { canonical: `${BASE_URL}/privacy` },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Privacy Policy | Ark',
        description: 'How Ark handles your personal information.',
        url: `${BASE_URL}/privacy`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ark Privacy Policy' }],
    },
    }

    export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
    }