    import Link from 'next/link'
    import Image from 'next/image'
    import type { SanityPostStub } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'
    import { formatDate } from '@/lib/posts'

    export default function SpotlightStrip({ post }: { post: SanityPostStub }) {
    return (
        <div
        className="relative overflow-hidden px-6 md:px-12 py-14 md:py-16"
        style={{
            background: '#1A1A22',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
        }}
        >
        {/* Watermark */}
        <span
            className="absolute right-0 top-1/2 -translate-y-1/2 font-extrabold pointer-events-none select-none whitespace-nowrap hidden md:block"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(80px, 10vw, 140px)',
            letterSpacing: '-0.06em',
            color: 'rgba(242,240,235,0.025)',
            }}
            aria-hidden="true"
        >
            SELLER SPOTLIGHT
        </span>

        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-16 items-center relative z-10">
            {/* Badge */}
            <div
            className="relative flex flex-col items-center justify-center gap-3 w-[140px] h-[140px] md:w-[160px] md:h-[160px] flex-shrink-0"
            style={{
                border: '1px solid rgba(200,255,0,0.2)',
                background: 'rgba(200,255,0,0.04)',
            }}
            >
            <span
                className="absolute top-0 left-0 right-0"
                style={{ height: '2px', background: '#C8FF00' }}
                aria-hidden="true"
            />
            <div
                className="w-14 h-14 overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ border: '1px solid rgba(200,255,0,0.2)' }}
            >
                {post.author.avatar?.asset ? (
                <Image
                    src={urlFor(post.author.avatar).width(112).height(112).url()}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                />
                ) : (
                <span className="text-2xl" aria-hidden="true">👤</span>
                )}
            </div>
            <span
                className="text-[11px] font-bold text-center px-2"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.01em' }}
            >
                {post.author.name}
            </span>
            <span
                className="text-[9px] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
            >
                Seller Spotlight
            </span>
            </div>

            {/* Content */}
            <div className="max-w-[560px]">
            <div
                className="text-[11px] uppercase tracking-[0.2em] mb-5 flex items-center gap-3"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
            >
                <span
                style={{ width: '20px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }}
                aria-hidden="true"
                />
                Featured Seller
            </div>

            <h2
                className="font-extrabold mb-5 leading-[1.05]"
                style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(22px, 3vw, 40px)',
                letterSpacing: '-0.03em',
                }}
            >
                {post.title}
            </h2>

            <p
                className="text-[12px] leading-[1.9] mb-8"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
            >
                {post.excerpt}
            </p>

            <div className="flex items-center gap-6 flex-wrap">
                <Link
                href={`/${post.slug}`}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] no-underline transition-all duration-200 hover:gap-4"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
                aria-label={`Read: ${post.title}`}
                >
                Read the Story →
                </Link>
                <time
                dateTime={post.publishedAt}
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.05em' }}
                >
                {formatDate(post.publishedAt)}
                </time>
            </div>
            </div>
        </div>
        </div>
    )
    }