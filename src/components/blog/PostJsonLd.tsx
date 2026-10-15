    import type { SanityPost } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'

    interface PostJsonLdProps {
    post: SanityPost
    }

    export default function PostJsonLd({ post }: PostJsonLdProps) {
    const BASE_URL = 'https://blog.geArk.ng'
    const postUrl = `${BASE_URL}/${post.slug}`

    const formattedDate = new Date(post.publishedAt).toISOString()

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': postUrl,
        url: postUrl,
        headline: post.title,
        description: post.excerpt,
        datePublished: formattedDate,
        dateModified: formattedDate,
        inLanguage: 'en-NG',
        author: {
        '@type': 'Organization',
        name: post.author.name,
        url: BASE_URL,
        },
        publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#publisher`,
        name: 'Tech Notes',
        url: BASE_URL,
        },
        isPartOf: {
        '@type': 'Blog',
        '@id': `${BASE_URL}/#blog`,
        name: 'Tech Notes',
        url: BASE_URL,
        },
        mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
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
        'Technology',
        'Software development',
        'Data engineering',
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