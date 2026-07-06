    import { PortableText } from 'next-sanity'
    import type { SanityBlock } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'
    import Image from 'next/image'

    const components = {
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
        <p
            className="mb-6"
            style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            lineHeight: '2',
            color: 'rgba(242,240,235,0.65)',
            }}
        >
            {children}
        </p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
        <h2
            className="font-bold mt-12 mb-5"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '26px',
            letterSpacing: '-0.02em',
            color: '#F2F0EB',
            }}
        >
            {children}
        </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
        <h3
            className="font-bold mt-8 mb-4"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '20px',
            letterSpacing: '-0.01em',
            color: '#F2F0EB',
            }}
        >
            {children}
        </h3>
        ),
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
        <strong style={{ color: '#F2F0EB', fontWeight: 600 }}>{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
        <em
            style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'rgba(242,240,235,0.8)',
            }}
        >
            {children}
        </em>
        ),
    },
    types: {
        image: ({ value }: { value: SanityBlock & { asset: unknown; alt?: string; caption?: string } }) => (
        <figure className="my-10">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
                src={urlFor(value).width(1200).url()}
                alt={value.alt ?? ''}
                fill
                className="object-cover"
            />
            </div>
            {value.caption && (
            <figcaption
                className="mt-3 text-center text-[11px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
            >
                {value.caption}
            </figcaption>
            )}
        </figure>
        ),
        callout: ({ value }: { value: { text: string } }) => (
        <blockquote
            className="my-8 px-7 py-5"
            style={{
            borderLeft: '2px solid #C8FF00',
            background: 'rgba(200,255,0,0.03)',
            }}
        >
            <p
            style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '20px',
                lineHeight: '1.6',
                color: '#F2F0EB',
            }}
            >
            {value.text}
            </p>
        </blockquote>
        ),
    },
    }

    export default function PostBody({ blocks }: { blocks: SanityBlock[] }) {
    return (
        <div>
        <PortableText value={blocks as any} components={components} />
        </div>
    )
    }