    import Link from 'next/link'
    import { Post, CATEGORY_STYLES, resolveCategorySlug } from '@/lib/posts'
    import PostTag from './PostTag'

    interface PostCardProps {
    post: Post
    variant?: 'default' | 'wide' | 'tall' | 'list'
    index?: number
    }

    export default function PostCard({ post, variant = 'default', index }: PostCardProps) {
    const category = resolveCategorySlug(post.category)
    const gradientBg = `linear-gradient(135deg, ${CATEGORY_STYLES[category].bg.replace('0.05', '0.12')} 0%, rgba(3,3,5,1) 100%)`
    const postDate = post.date ?? post.publishedAt ?? ''
    const coverEmoji = post.coverEmoji ?? '✍️'

    if (variant === 'list') {
        return (
        <Link
            href={`/blog/${post.slug}`}
            className="reveal block no-underline transition-colors duration-300 p-7"
            style={{
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            <div
            className="text-[10px] mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
            >
            {post.date}
            </div>
            <PostTag category={post.category} size="sm" />
            <h4
            className="text-[15px] font-bold leading-[1.3] mt-3 mb-3 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
            >
            {post.title}
            </h4>
            <p
            className="text-[11px] leading-[1.8]"
            style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(242,240,235,0.45)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            } as React.CSSProperties}
            >
            {post.excerpt}
            </p>
        </Link>
        )
    }

    if (variant === 'wide') {
        return (
        <Link
            href={`/blog/${post.slug}`}
            className="reveal grid no-underline transition-colors duration-300"
            style={{
            gridTemplateColumns: '1fr 1fr',
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            <div
            className="flex items-center justify-center"
            style={{ background: gradientBg, minHeight: '320px' }}
            >
            <span style={{ fontSize: '60px', opacity: 0.45 }}>{coverEmoji}</span>
            </div>
            <div className="flex flex-col justify-between p-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                <PostTag category={post.category} />
                <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
                >
                    {postDate}
                </span>
                </div>
                <h3
                className="font-bold mb-4 leading-[1.1] transition-colors duration-200"
                style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: 'clamp(18px, 2.2vw, 28px)',
                    letterSpacing: '-0.03em',
                }}
                >
                {post.title}
                </h3>
                <p
                className="text-[12px] leading-[1.9]"
                style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(242,240,235,0.5)',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                } as React.CSSProperties}
                >
                {post.excerpt}
                </p>
            </div>
            <div
                className="flex items-center justify-between pt-4 mt-4"
                style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
                <span
                className="text-[11px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                {post.author.name}
                </span>
                <span
                className="text-[10px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
                >
                Read More →
                </span>
            </div>
            </div>
        </Link>
        )
    }

    // default card
    return (
        <Link
        href={`/blog/${post.slug}`}
        className="reveal block no-underline transition-colors duration-300"
        style={{
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
        {/* Card image */}
        <div
            className="w-full flex items-center justify-center"
            style={{ aspectRatio: '16/9', background: gradientBg }}
        >
            <span style={{ fontSize: '40px', opacity: 0.5 }}>{coverEmoji}</span>
        </div>

        {/* Card body */}
        <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
            <PostTag category={post.category} />
            <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
            >
                {post.date}
            </span>
            </div>

            <h3
            className="text-[18px] font-bold leading-[1.2] mb-3 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
            >
            {post.title}
            </h3>

            <p
            className="text-[11px] leading-[1.8] mb-5"
            style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(242,240,235,0.5)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            } as React.CSSProperties}
            >
            {post.excerpt}
            </p>

            <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
            <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)', letterSpacing: '0.05em' }}
            >
                {post.author.name}
            </span>
            <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)', letterSpacing: '0.05em' }}
            >
                {post.readTime}
            </span>
            </div>
        </div>
        </Link>
    )
    }