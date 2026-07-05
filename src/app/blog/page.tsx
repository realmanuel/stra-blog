    'use client'

    import { useState } from 'react'
    import CustomCursor from '@/components/CustomCursor'
    // import Navbar from '@/components/Navbar'
    // import Footer from '@/components/Footer'
    import BlogHero from '@/components/blog/BlogHero'
    import PostCard from '@/components/blog/PostCard'
    import CategoryBar from '@/components/blog/CategoryBar'
    import SpotlightStrip from '@/components/blog/SpotlightStrip'
    // import { useScrollReveal } from '@/hooks/useScrollReveal'
    import {
    getAllPosts,
    getFeaturedPost,
    type Category,
    type Post,
    } from '@/lib/posts'

    const allPosts = getAllPosts()
    const featuredPost = getFeaturedPost()
    const sellerSpotlight = allPosts.find(
    (p) => p.category === 'seller-story' && p.slug !== featuredPost.slug
    )

    export default function BlogPage() {
    // useScrollReveal()

    const [filtered, setFiltered] = useState<Post[]>(
        allPosts.filter((p) => p.slug !== featuredPost.slug)
    )

    function handleFilter(category: Category | 'all') {
        const base = allPosts.filter((p) => p.slug !== featuredPost.slug)
        setFiltered(
        category === 'all' ? base : base.filter((p) => p.category === category)
        )
    }

    // Layout buckets
    const gridRow1 = filtered.slice(0, 3)
    const widePost = filtered[3]
    const tallPost = filtered[4]
    const listPosts = filtered.slice(5, 9)
    const remainingPosts = filtered.slice(9)

    return (
        <>
        <CustomCursor />
        {/* <Navbar /> */}
        <main>

            {/* Journal header */}
            <header
            className="px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
            style={{
                paddingTop: '140px',
                paddingBottom: '48px',
                borderBottom: '1px solid rgba(242,240,235,0.08)',
            }}
            >
            <div>
                <div
                className="animate-fadeUp-1 text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
                >
                <span style={{ width: '32px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }} />
                Stra Journal
                </div>
                <h1
                className="animate-fadeUp-2 font-extrabold leading-[0.92]"
                style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: 'clamp(52px, 7vw, 96px)',
                    letterSpacing: '-0.04em',
                }}
                >
                Stories, Updates<br />
                &{' '}
                <em
                    style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'rgba(242,240,235,0.35)',
                    }}
                >
                    Spotlights
                </em>
                </h1>
            </div>

            <div className="animate-fadeUp-3 max-w-[320px]">
                <p
                className="text-[12px] leading-[1.9] mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
                >
                The official Stra publication. Platform updates, product spotlights, seller features,
                marketplace insights, and everything happening inside Nigeria's smartest secondhand market.
                </p>
                <span
                className="text-[10px] uppercase tracking-[0.15em] px-4 py-2 inline-block"
                style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(242,240,235,0.3)',
                    border: '1px solid rgba(242,240,235,0.08)',
                }}
                >
                Vol. 01 — 2026
                </span>
            </div>
            </header>

            {/* Category filter */}
            <CategoryBar onFilter={handleFilter} />

            {/* Featured hero post */}
            <BlogHero post={featuredPost} />

            {/* Section label */}
            <div
            className="px-6 md:px-12 py-5 flex items-center gap-4"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
            <span
                className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
                Latest Posts
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }} />
            </div>

            {/* 3-col grid row */}
            {gridRow1.length > 0 && (
            <div
                className="grid grid-cols-1 md:grid-cols-3"
                style={{
                borderBottom: '1px solid rgba(242,240,235,0.08)',
                }}
            >
                {gridRow1.map((post) => (
                <PostCard key={post.slug} post={post} variant="default" />
                ))}
            </div>
            )}

            {/* Seller spotlight strip */}
            {sellerSpotlight && <SpotlightStrip post={sellerSpotlight} />}

            {/* Wide + tall row */}
            {(widePost || tallPost) && (
            <div
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr]"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
                {widePost && <PostCard post={widePost} variant="wide" />}
                {tallPost && (
                <div
                    className="flex flex-col"
                    style={{ borderLeft: '1px solid rgba(242,240,235,0.08)' }}
                >
                    <div
                    className="flex-1 flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(3,3,5,1) 100%)`,
                        minHeight: '180px',
                    }}
                    >
                    <span style={{ fontSize: '44px', opacity: 0.45 }}>{tallPost.coverEmoji}</span>
                    </div>
                    <div
                    className="p-7"
                    style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
                    >
                    <div className="flex items-center gap-3 mb-3">
                        <PostTag category={tallPost.category} size="sm" />
                    </div>
                    <h3
                        className="font-bold leading-[1.2] mb-3 transition-colors duration-200"
                        style={{
                        fontFamily: 'var(--font-syne)',
                        fontSize: '17px',
                        letterSpacing: '-0.02em',
                        }}
                    >
                        {tallPost.title}
                    </h3>
                    <p
                        className="text-[11px] leading-[1.8] mb-4"
                        style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'rgba(242,240,235,0.45)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        } as React.CSSProperties}
                    >
                        {tallPost.excerpt}
                    </p>
                    <div
                        className="flex items-center justify-between pt-4"
                        style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
                    >
                        <span
                        className="text-[10px]"
                        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                        >
                        {tallPost.author.name}
                        </span>
                        <span
                        className="text-[10px]"
                        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                        >
                        {tallPost.readTime}
                        </span>
                    </div>
                    </div>
                </div>
                )}
            </div>
            )}

            {/* 4-col list row */}
            {listPosts.length > 0 && (
            <>
                <div
                className="px-6 md:px-12 py-5 flex items-center gap-4"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                >
                <span
                    className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    More Posts
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }} />
                </div>
                <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                >
                {listPosts.map((post) => (
                    <PostCard key={post.slug} post={post} variant="list" />
                ))}
                </div>
            </>
            )}

            {/* Overflow — any posts beyond 9 become a standard 3-col grid */}
            {remainingPosts.length > 0 && (
            <div
                className="grid grid-cols-1 md:grid-cols-3"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
                {remainingPosts.map((post) => (
                <PostCard key={post.slug} post={post} variant="default" />
                ))}
            </div>
            )}

        </main>
        {/* <Footer /> */}
        </>
    )
    }

    // inline PostTag import needed for tallPost fallback
    import PostTag from '@/components/blog/PostTag'