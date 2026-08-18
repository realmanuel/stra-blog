    import type { SanityPost } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'

    interface PostJsonLdProps {
    post: SanityPost
    }

    export default function PostJsonLd({ post }: PostJsonLdProps) {
    const BASE_URL = 'https://blog.geArk.ng'
    const MAIN_URL = 'https://www.geArk.ng'

    const formattedDate = new Date(post.publishedAt).toISOString()

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${BASE_URL}/blog/${post.slug}`,
        url: `${BASE_URL}/blog/${post.slug}`,
        headline: post.title,
        description: post.excerpt,
        datePublished: formattedDate,
        dateModified: formattedDate,
        inLanguage: 'en-NG',
        author: {
        '@type': 'Organization',
        name: post.author.name,
        url: MAIN_URL,
        },
        publisher: {
        '@type': 'Organization',
        '@id': `${MAIN_URL}/#organization`,
        name: 'Ark',
        url: MAIN_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${MAIN_URL}/og-image.png`,
            width: 1200,
            height: 630,
        },
        },
        isPartOf: {
        '@type': 'Blog',
        '@id': `${BASE_URL}/#blog`,
        name: 'Ark Journal',
        url: BASE_URL,
        },
        mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/blog/${post.slug}`,
        },
        ...(post.coverImage && {
        image: {
            '@type': 'ImageObject',
            url: urlFor(post.coverImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
        },
        }),
        ...(post.readTime && {
        timeRequired: post.readTime,
        }),
        articleSection: post.category.title,
        keywords: [
        post.category.title,
        'Ark',
        'Nigeria marketplace',
        'secondhand Nigeria',
        ].join(', '),
        about: {
        '@type': 'Thing',
        name: post.category.title,
        },
    }

    return (
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
    }