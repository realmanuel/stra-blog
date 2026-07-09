    import Link from 'next/link'
    import Image from 'next/image'
    import type { SanityPostStub } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'
    import { formatDate, getCardGradient } from '@/lib/posts'
    import PostTag from './PostTag'

    interface PostCardProps {
    post: SanityPostStub
    variant?: 'default' | 'wide' | 'tall' | 'list'
    }

    function CardImage({
    post,
    aspectRatio = '16/9',
    minHeight,
    }: {
    post: SanityPostStub
    aspectRatio?: string
    minHeight?: string
    }) {
    const gradient = getCardGradient(post.category.slug)

    if (post.coverImage?.asset) {
        return (
        <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio, minHeight }}
        >
            <Image
            src={urlFor(post.coverImage).width(800).url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
        )
    }

    return (
        <div
        className="w-full flex items-center justify-center"
        style={{ aspectRatio, minHeight, background: gradient }}
        />
    )
    }

    export default function PostCard({ post, variant = 'default' }: PostCardProps) {
    const href = `/${post.slug}`
    const date = formatDate(post.publishedAt)

    if (variant === 'list') {
        return (
        <Link
            href={href}
            className="group block no-underline p-7 transition-colors duration-300"
            style={{
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            <time
            dateTime={post.publishedAt}
            className="block text-[10px] mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
            >
            {date}
            </time>
            <div className="mb-3">
            <PostTag categorySlug={post.category.slug} size="sm" />
            </div>
            <h3
            className="text-[15px] font-bold leading-[1.3] mb-3 transition-colors duration-200 group-hover:text-[#C8FF00]"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
            >
            {post.title}
            </h3>
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
            href={href}
            className="group grid no-underline transition-colors duration-300"
            style={{
            gridTemplateColumns: '1fr 1fr',
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            <CardImage post={post} aspectRatio="auto" minHeight="320px" />
            <div className="flex flex-col justify-between p-10">
            <div>
                <div className="flex items-center gap-3 mb-5">
                <PostTag categorySlug={post.category.slug} />
                <time
                    dateTime={post.publishedAt}
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
                >
                    {date}
                </time>
                </div>
                <h3
                className="font-bold mb-4 leading-[1.1] transition-colors duration-200 group-hover:text-[#C8FF00]"
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
                className="flex items-center justify-between pt-5 mt-5"
                style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
                <span
                className="text-[11px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                >
                {post.author.name}
                </span>
                <span
                className="text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 group-hover:text-[#C8FF00]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                >
                Read →
                </span>
            </div>
            </div>
        </Link>
        )
    }

    if (variant === 'tall') {
        return (
        <Link
            href={href}
            className="group flex flex-col no-underline transition-colors duration-300"
            style={{
            borderLeft: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            <CardImage post={post} aspectRatio="auto" minHeight="200px" />
            <div
            className="p-7 flex flex-col flex-1"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
            <div className="flex items-center gap-3 mb-3">
                <PostTag categorySlug={post.category.slug} size="sm" />
            </div>
            <h3
                className="text-[17px] font-bold leading-[1.2] mb-3 transition-colors duration-200 group-hover:text-[#C8FF00]"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
            >
                {post.title}
            </h3>
            <p
                className="text-[11px] leading-[1.8] flex-1"
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
            <div
                className="flex items-center justify-between pt-4 mt-4"
                style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
                <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                >
                {post.author.name}
                </span>
                {post.readTime && (
                <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                >
                    {post.readTime}
                </span>
                )}
            </div>
            </div>
        </Link>
        )
    }

    // Default card
    return (
        <Link
        href={href}
        className="group block no-underline transition-colors duration-300"
        style={{
            borderRight: '1px solid rgba(242,240,235,0.08)',
            color: 'inherit',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,240,235,0.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
        <CardImage post={post} />

        <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
            <PostTag categorySlug={post.category.slug} />
            <time
                dateTime={post.publishedAt}
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}
            >
                {date}
            </time>
            </div>

            <h3
            className="text-[18px] font-bold leading-[1.2] mb-3 transition-colors duration-200 group-hover:text-[#C8FF00]"
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
            {post.readTime && (
                <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)', letterSpacing: '0.05em' }}
                >
                {post.readTime}
                </span>
            )}
            </div>
        </div>
        </Link>
    )
    }