    import Link from 'next/link'
    import { Post, CATEGORY_STYLES, resolveCategorySlug } from '@/lib/posts'
    import PostTag from './PostTag'

    export default function BlogHero({ post }: { post: Post }) {
    const category = resolveCategorySlug(post.category)
    const postDate = post.date ?? post.publishedAt ?? ''
    const coverEmoji = post.coverEmoji ?? '✍️'
    const avatarLabel = typeof post.author.avatar === 'string' ? post.author.avatar : '✍️'

    return (
        <article
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderBottom: '1px solid rgba(242,240,235,0.08)', minHeight: '560px' }}
        >
        {/* Cover image area */}
        <div
            className="relative overflow-hidden hidden md:block"
            style={{
            background: '#1A1A22',
            borderRight: '1px solid rgba(242,240,235,0.08)',
            }}
        >
            <div
            className="w-full h-full flex items-center justify-center relative"
            style={{
                minHeight: '560px',
                background: `linear-gradient(135deg, ${CATEGORY_STYLES[category].bg.replace('0.05', '0.12')} 0%, transparent 60%), linear-gradient(to bottom right, #1A1A22, #030305)`,
            }}
            >
            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                backgroundImage: `
                    linear-gradient(rgba(242,240,235,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(242,240,235,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                }}
            />
            <div className="relative z-10 text-center">
                <span className="text-[80px] block mb-4 opacity-60">{coverEmoji}</span>
                <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                Cover Image
                </span>
            </div>
            </div>
            {/* Accent bottom line */}
            <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '3px', background: CATEGORY_STYLES[category].color }}
            />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-10 md:p-14">
            <div>
            <div className="flex items-center gap-4 mb-8">
                <PostTag category={post.category} />
                <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                {postDate}
                </span>
            </div>

            <h2
                className="font-extrabold mb-6 leading-[1.05]"
                style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(24px, 3.2vw, 44px)',
                letterSpacing: '-0.03em',
                }}
            >
                {post.title}
            </h2>

            <p
                className="text-[13px] leading-[1.9]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
            >
                {post.excerpt}
            </p>
            </div>

            <div
            className="flex items-center justify-between pt-8 mt-8"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
            <div className="flex items-center gap-3">
                <div
                className="w-9 h-9 flex items-center justify-center text-sm flex-shrink-0"
                style={{
                    background: 'rgba(200,255,0,0.08)',
                    border: '1px solid rgba(200,255,0,0.2)',
                }}
                >
                {avatarLabel}
                </div>
                <div>
                <div
                    className="text-[12px] font-medium"
                    style={{ fontFamily: 'var(--font-mono)', color: '#F2F0EB' }}
                >
                    {post.author.name}
                </div>
                <div
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    {post.author.role}
                </div>
                </div>
            </div>

            <Link
                href={`/${post.slug}`}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] no-underline transition-all duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
            >
                Read Article →
            </Link>
            </div>
        </div>
        </article>
    )
    }