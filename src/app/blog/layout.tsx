    import type { Metadata } from 'next'

    const BASE_URL = 'https://www.gestra.ng'

    export const metadata: Metadata = {
    title: {
        default: 'Stra Journal',
        template: '%s | Stra Journal',
    },
    description:
        'The official Stra publication. Platform updates, product spotlights, seller stories, marketplace insights, and everything happening inside Nigeria\'s smartest secondhand market.',
    alternates: { canonical: `${BASE_URL}/blog` },
    openGraph: {
        title: 'Stra Journal — Stories, Updates & Spotlights',
        description: 'The official Stra publication.',
        url: `${BASE_URL}/blog`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stra Journal' }],
    },
    }

    export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
    }