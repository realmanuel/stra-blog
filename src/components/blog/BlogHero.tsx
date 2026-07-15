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
            minHeight: '540px',
        }}
        >
        {/* Cover image */}
        <div
            className="relative overflow-hidden hidden md:block group"
            style={{ borderRight: '1px solid rgba(242,240,235,0.08)' }}
        >
            {post.coverImage?.asset ? (
            <>
                <Image
                src={urlFor(post.coverImage).width(960).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
                sizes="50vw"
                />
                {/* Scrim */}
                <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.3) 0%, transparent 50%)' }}
                aria-hidden="true"
                />
            </>
            ) : (
            <div
                className="w-full h-full"
                style={{ background: gradient, minHeight: '540px' }}
            >
                <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(242,240,235,0.035) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(242,240,235,0.035) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
                aria-hidden="true"
                />
            </div>
            )}

            {/* Accent line */}
            <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '2px', background: '#C8FF00' }}
            aria-hidden="true"
            />
        </div>

        {/* Content */}
        <div
            className="flex flex-col justify-between"
            style={{ padding: 'clamp(40px, 5vw, 64px)' }}
        >
            <div>
            {/* Meta */}
            <div className="flex items-center gap-4 mb-7 flex-wrap">
                <PostTag categorySlug={post.category.slug} />
                <time
                dateTime={post.publishedAt}
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
                >
                {date}
                </time>
            </div>

            {/* Title */}
            <h2
                className="font-extrabold mb-5 leading-[1.02]"
                style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(26px, 3vw, 46px)',
                letterSpacing: '-0.035em',
                }}
            >
                {post.title}
            </h2>

            {/* Excerpt */}
            <p
                className="text-[13px] leading-[1.95]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.48)' }}
            >
                {post.excerpt}
            </p>
            </div>

            {/* Author + CTA */}
            <div
            className="flex items-center justify-between mt-10 pt-7 flex-wrap gap-4"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
            <div className="flex items-center gap-3">
                <div
                className="w-9 h-9 flex items-center justify-center text-sm flex-shrink-0 overflow-hidden"
                style={{
                    background: 'rgba(200,255,0,0.07)',
                    border: '1px solid rgba(200,255,0,0.18)',
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

            {/* Fixed Link: replaced inline JS handlers with Tailwind hover utilities */}
            <Link
                href={`/${post.slug}`}
                className="text-[11px] uppercase tracking-[0.12em] hover:tracking-[0.18em] no-underline transition-all duration-300 text-[#C8FF00] hover:text-[#d4ff1a]"
                style={{ fontFamily: 'var(--font-mono)' }}
                aria-label={`Read: ${post.title}`}
            >
                Read Article →
            </Link>
            </div>
        </div>
        </article>
    )
    }