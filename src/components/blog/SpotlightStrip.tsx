    import Link from 'next/link'
    import { Post, resolveCategorySlug } from '@/lib/posts'

    export default function SpotlightStrip({ post }: { post: Post }) {
    const coverEmoji = post.coverEmoji ?? '✍️'
    return (
        <div
        className="relative overflow-hidden px-6 md:px-12 py-14 md:py-16"
        style={{ background: '#1A1A22', borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
        {/* Watermark */}
        <span
            className="absolute right-0 top-1/2 -translate-y-1/2 font-extrabold pointer-events-none select-none whitespace-nowrap hidden md:block"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '120px',
            letterSpacing: '-0.06em',
            color: 'rgba(242,240,235,0.025)',
            }}
        >
            SELLER SPOTLIGHT
        </span>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-center relative z-10">
            {/* Badge */}
            <div
            className="relative flex flex-col items-center justify-center gap-3 w-[160px] md:w-[200px] h-[160px] md:h-[200px]"
            style={{
                border: '1px solid rgba(200,255,0,0.2)',
                background: 'rgba(200,255,0,0.04)',
            }}
            >
            <span
                className="absolute top-0 left-0 right-0"
                style={{ height: '2px', background: '#C8FF00' }}
            />
            <span className="text-5xl">{coverEmoji}</span>
            <span
                className="text-[11px] font-bold text-center px-3"
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
                <span style={{ width: '20px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }} />
                Featured Seller
            </div>

            <h2
                className="reveal font-extrabold mb-5 leading-[1.05]"
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

            <Link
                href={`/${post.slug}`}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] no-underline transition-all duration-200 w-fit"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
            >
                Read the Story →
            </Link>
            </div>
        </div>
        </div>
    )
    }