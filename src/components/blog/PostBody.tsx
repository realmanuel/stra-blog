    import { PortableText, type PortableTextComponents } from 'next-sanity'
    import Image from 'next/image'
    import type { SanityBlock } from '@/sanity/types'
import { createImageUrlBuilder } from '@sanity/image-url'
import { urlFor } from '@/sanity/sanity.client'


        const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
        <p
            className="mb-7 last:mb-0 text-[15px] md:text-[16px] leading-[1.85] text-[rgba(242,240,235,0.75)]"
            style={{
            fontFamily: 'var(--font-mono)',
            }}
        >
            {children}
        </p>
        ),
        h2: ({ children }) => (
        <h2
            className="font-bold mt-16 md:mt-20 mb-6 first:mt-0 text-[#F2F0EB]"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(22px, 3vw, 32px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            }}
        >
            {children}
        </h2>
        ),
        h3: ({ children }) => (
        <h3
            className="font-bold mt-12 md:mt-14 mb-4 first:mt-0 text-[#F2F0EB]"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            }}
        >
            {children}
        </h3>
        ),
        blockquote: ({ children }) => (
        <blockquote
            className="my-12 px-8 py-7 md:py-9 rounded-r-lg"
            style={{
            borderLeft: '3px solid #C8FF00',
            background: 'rgba(200,255,0,0.03)',
            }}
        >
            <p
            style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(19px, 2.5vw, 24px)',
                lineHeight: 1.6,
                color: '#F2F0EB',
                margin: 0,
            }}
            >
            {children}
            </p>
        </blockquote>
        ),
    },

    marks: {
        strong: ({ children }) => (
        <strong style={{ color: '#F2F0EB', fontWeight: 600 }}>{children}</strong>
        ),
        em: ({ children }) => (
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
        link: ({ children, value }) => (
        <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[#C8FF00] underline underline-offset-[3px] hover:text-[#d4ff1a] transition-colors"
        >
        {children}
        </a>
        ),
    },
    types: {
        image: ({ value }) => {
        if (!value?.asset) return null
        return (
            <figure className="my-10">
            <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '16/9' }}
            >
                <Image
                src={urlFor(value).width(1200).url()}
                alt={value.alt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                />
            </div>
            {value.caption && (
                <figcaption
                className="mt-3 text-center text-[11px]"
                style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(242,240,235,0.35)',
                    letterSpacing: '0.05em',
                }}
                >
                {value.caption}
                </figcaption>
            )}
            </figure>
        )
        },
        callout: ({ value }) => {
        if (!value?.text) return null
        return (
            <blockquote
            className="my-10 px-7 py-6"
            style={{
                borderLeft: '2px solid #C8FF00',
                background: 'rgba(200,255,0,0.03)',
            }}
            >
            <p
                style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 2vw, 21px)',
                lineHeight: 1.65,
                color: '#F2F0EB',
                margin: 0,
                }}
            >
                {value.text}
            </p>
            </blockquote>
        )
        },
    },
    }

    interface PostBodyProps {
    blocks: SanityBlock[]
    }

    export default function PostBody({ blocks }: PostBodyProps) {
    if (!blocks?.length) return null

    return (
        <div className="max-w-[680px]">
        <PortableText value={blocks as any} components={components} />
        </div>
    )
    }