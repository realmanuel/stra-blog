    import { notFound } from 'next/navigation'
    import type { Metadata } from 'next'
    import CustomCursor from '@/components/CustomCursor'
    // import Navbar from '@/components/Navbar'
    // import Footer from '@/components/Footer'
    import PostBody from '@/components/blog/PostBody'
    import PostTag from '@/components/blog/PostTag'
    import PostCard from '@/components/blog/PostCard'
    import Link from 'next/link'
    import {
    getAllPosts,
    getPostBySlug,
    getRelatedPosts,
    } from '@/lib/posts'

    const BASE_URL = 'https://www.gestra.ng'

    export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }))
    }

    export async function generateMetadata({
    params,
    }: {
    params: { slug: string }
    }): Promise<Metadata> {
    const post = getPostBySlug(params.slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
        openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${BASE_URL}/blog/${post.slug}`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: ['/og-image.png'],
        },
    }
    }

    export default function PostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)
    if (!post) notFound()

    const related = getRelatedPosts(post.slug, post.category, 3)
    const otherPosts = getAllPosts()
        .filter((p) => p.slug !== post.slug && !related.find((r) => r.slug === p.slug))
        .slice(0, 3 - related.length)
    const sidebarPosts = [...related, ...otherPosts].slice(0, 3)

    return (
        <>
        <CustomCursor />
        {/* <Navbar /> */}
        <main>

            {/* Breadcrumb bar */}
            <div
            className="px-6 md:px-12 flex items-center gap-2"
            style={{
                paddingTop: '96px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(242,240,235,0.08)',
            }}
            >
            <Link
                href="/blog"
                className="text-[10px] uppercase tracking-[0.15em] no-underline transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.35)')}
            >
                ← Stra Journal
            </a>
            <span
                className="text-[10px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.2)' }}
            >
                /
            </span>
            <PostTag category={post.category} size="sm" />
            </div>

            {/* Post hero */}
            <div
            className="px-6 md:px-12 py-14 md:py-20"
            style={{
                borderBottom: '1px solid rgba(242,240,235,0.08)',
                maxWidth: '960px',
            }}
            >
            <div className="flex items-center gap-4 mb-8">
                <PostTag category={post.category} />
                <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                {post.date}
                </span>
                <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                · {post.readTime}
                </span>
            </div>

            <h1
                className="font-extrabold leading-[0.95] mb-8"
                style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                letterSpacing: '-0.04em',
                }}
            >
                {post.title}
            </h1>

            <p
                className="text-[14px] leading-[1.9] max-w-[600px] mb-12"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
            >
                {post.excerpt}
            </p>

            <div
                className="flex items-center justify-between pt-8"
                style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
            >
                <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 flex items-center justify-center text-sm flex-shrink-0"
                    style={{
                    background: 'rgba(200,255,0,0.08)',
                    border: '1px solid rgba(200,255,0,0.2)',
                    }}
                >
                    {post.author.avatar}
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
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                    >
                    {post.author.role}
                    </div>
                </div>
                </div>
                <span
                className="text-[10px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                Published {post.date}
                </span>
            </div>
            </div>

            {/* Cover image */}
            <div
            className="w-full flex items-center justify-center relative overflow-hidden"
            style={{
                aspectRatio: '21/9',
                background: `linear-gradient(135deg, rgba(200,255,0,0.07) 0%, transparent 50%), linear-gradient(to bottom, #1A1A22, #030305)`,
                borderBottom: '1px solid rgba(242,240,235,0.08)',
            }}
            >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                backgroundImage: `
                    linear-gradient(rgba(242,240,235,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(242,240,235,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                }}
            />
            <div className="relative z-10 text-center">
                <span className="text-[80px] block mb-4 opacity-40">{post.coverEmoji}</span>
                <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.25)' }}
                >
                Cover Image — 1200 × 514
                </span>
            </div>
            </div>

            {/* Body + sidebar */}
            <div
            className="grid grid-cols-1 md:grid-cols-[1fr_300px]"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
            {/* Article body */}
            <div
                className="px-6 md:px-12 py-14 md:py-20"
                style={{ borderRight: '1px solid rgba(242,240,235,0.08)' }}
            >
                {post.body ? (
                <PostBody blocks={post.body} />
                ) : (
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}>
                    Content coming soon.
                </p>
                )}
            </div>

            {/* Sidebar */}
            <aside className="hidden md:flex flex-col gap-10 p-8">
                {/* Related posts */}
                <div>
                <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    <span style={{ width: '16px', height: '1px', background: 'rgba(242,240,235,0.3)', display: 'block', flexShrink: 0 }} />
                    Related Posts
                </div>
                <div className="flex flex-col">
                    {sidebarPosts.map((related, i) => (
                    <a
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="block no-underline pb-5 mb-5 transition-opacity duration-200"
                        style={{
                        borderBottom: i < sidebarPosts.length - 1
                            ? '1px solid rgba(242,240,235,0.08)'
                            : 'none',
                        color: 'inherit',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                        <div className="mb-2">
                        <PostTag category={related.category} size="sm" />
                        </div>
                        <div
                        className="text-[13px] font-semibold leading-[1.3] mb-2"
                        style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.01em' }}
                        >
                        {related.title}
                        </div>
                        <div
                        className="text-[10px]"
                        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.05em' }}
                        >
                        {related.date} · {related.readTime}
                        </div>
                    </a>
                    ))}
                </div>
                </div>

                {/* About */}
                <div style={{ borderTop: '1px solid rgba(242,240,235,0.08)', paddingTop: '32px' }}>
                <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    <span style={{ width: '16px', height: '1px', background: 'rgba(242,240,235,0.3)', display: 'block', flexShrink: 0 }} />
                    About Stra Journal
                </div>
                <p
                    className="text-[11px] leading-[1.8]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                >
                    The official Stra publication — platform updates, seller stories, product spotlights, and marketplace insights written by the Stra team.
                </p>
                </div>
            </aside>
            </div>

            {/* More posts */}
            {sidebarPosts.length > 0 && (
            <>
                <div
                className="px-6 md:px-12 py-5 flex items-center gap-4"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                >
                <span
                    className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    More from Stra Journal
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }} />
                </div>
                <div
                className="grid grid-cols-1 md:grid-cols-3"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                >
                {sidebarPosts.map((p) => (
                    <PostCard key={p.slug} post={p} variant="default" />
                ))}
                </div>
            </>
            )}

        </main>
        {/* <Footer /> */}
        </>
    )
    }