    import Link from 'next/link'
    import Image from 'next/image'
    import type { SanityPostStub } from '@/sanity/types'
    import { urlFor } from '@/sanity/sanity.client'
    import { formatDate, getCardGradient } from '@/lib/posts'
    import PostTag from './PostTag'

    export default function BlogHero({ post }: { post: SanityPostStub }) {
    const date = formatDate(post.publishedAt)
    const gradient = getCardGradient(post.category.slug)

    return (
        <article
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
            borderBottom: '1px solid rgba(242,240,235,0.08)',
            minHeight: '520px',
        }}
        >
        {/* Cover */}
        <div
            className="relative overflow-hidden hidden md:block"
            style={{ borderRight: '1px solid rgba(242,240,235,0.08)' }}
        >
            {post.coverImage?.asset ? (
            <Image
                src={urlFor(post.coverImage).width(900).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                className="object-cover"
                priority
                sizes="50vw"
            />
            ) : (
            <div
                className="w-full h-full"
                style={{
                background: gradient,
                minHeight: '520px',
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
            </div>
            )}

            {/* Accent line */}
            <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '3px', background: '#C8FF00' }}
            aria-hidden="true"
            />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-10 md:p-14">
            <div>
            <div className="flex items-center gap-4 mb-8 flex-wrap">
                <PostTag categorySlug={post.category.slug} />
                <time
                dateTime={post.publishedAt}
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                {date}
                </time>
            </div>

            <h2
                className="font-extrabold mb-6 leading-[1.02]"
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
            className="flex items-center justify-between pt-8 mt-8 flex-wrap gap-4"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
            {/* Author */}
            <div className="flex items-center gap-3">
                <div
                className="w-9 h-9 flex items-center justify-center text-sm flex-shrink-0 overflow-hidden"
                style={{
                    background: 'rgba(200,255,0,0.08)',
                    border: '1px solid rgba(200,255,0,0.2)',
                }}
                aria-hidden="true"
                >
                {post.author.avatar?.asset ? (
                    <Image
                    src={urlFor(post.author.avatar).width(72).height(72).url()}
                    alt={post.author.name}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    />
                ) : (
                    <span>✍️</span>
                )}
                </div>
                <div>
                <div
                    className="text-[12px] font-medium"
                    style={{ fontFamily: 'var(--font-mono)', color: '#F2F0EB' }}
                >
                    {post.author.name}
                </div>
                {post.author.role && (
                    <div
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                    >
                    {post.author.role}
                    </div>
                )}
                </div>
            </div>

            <Link
                href={`/${post.slug}`}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] no-underline transition-all duration-200 hover:gap-4"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
                aria-label={`Read: ${post.title}`}
            >
                Read Article →
            </Link>
            </div>
        </div>
        </article>
    )
    }