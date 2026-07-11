  import type { Metadata } from 'next'
  import BlogNavbar from '@/components/BlogNavbar'
  import Link from 'next/link'
  import BlogFooter from '@/components/BlogFooter'
  import BlogHero from '@/components/blog/BlogHero'
  import PostCard from '@/components/blog/PostCard'
  import PostGrid from '@/components/blog/PostGrid'
  import CategoryBar from '@/components/blog/CategoryBar'
  import SpotlightStrip from '@/components/blog/SpotlightStrip'
  import {
    getAllPosts,
    getFeaturedPost,
    getAllCategories,
    getPostsByCategory,
  } from '@/sanity/queries'

  export const revalidate = 60

  interface PageProps {
    searchParams: Promise<{ category?: string }>
  }

  export async function generateMetadata({
    searchParams,
  }: PageProps): Promise<Metadata> {
    const { category } = await searchParams
    if (!category || category === 'all') return {}
    return {
      title: `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} — Stra Journal`,
    }
  }

  export default async function BlogIndexPage({ searchParams }: PageProps) {
    const { category } = await searchParams

    const activeCategory =
      !category || category === 'all' ? undefined : category

    // Parallel fetch — categories always needed, posts depend on filter
    const [categories, featuredPost, postsResult] = await Promise.all([
      getAllCategories(),
      // Only fetch featured when showing all posts
      activeCategory ? Promise.resolve(null) : getFeaturedPost(),
      // Fetch filtered or all posts
      activeCategory ? getPostsByCategory(activeCategory) : getAllPosts(),
    ])

    const hero = activeCategory
      ? null
      : featuredPost ?? (postsResult[0] ?? null)

    const rest = hero
      ? postsResult.filter((p) => p.slug !== hero.slug)
      : postsResult

    // Layout buckets — only used when showing all posts (no category filter)
    const sellerSpotlight = !activeCategory
      ? (rest.find((p) => p.category.slug === 'seller-story') ?? null)
      : null

    const gridRow1 = rest.slice(0, 3)
    const widePost = !activeCategory ? (rest[3] ?? null) : null
    const tallPost = !activeCategory ? (rest[4] ?? null) : null
    const listPosts = !activeCategory ? rest.slice(5, 9) : []
    const remainingPosts = !activeCategory ? rest.slice(9) : []

    // When filtering, all results go into a simple grid
    const filteredPosts = activeCategory ? rest : []

    return (
      <>
        <BlogNavbar />
        <main id="main-content">

          {/* ── Journal header ── */}
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
                <span
                  style={{ width: '32px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }}
                  aria-hidden="true"
                />
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
                The official Stra publication. Platform updates, product spotlights,
                seller features, marketplace insights, and everything happening inside
                Nigeria&apos;s smartest secondhand market.
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

          {/* ── Category filter ── */}
          <CategoryBar
            categories={categories}
            activeCategory={activeCategory ?? 'all'}
          />

          {/* ── FILTERED VIEW — simple grid ── */}
          {activeCategory && (
            <>
              {filteredPosts.length > 0 ? (
                <>
                  <div
                    className="px-6 md:px-12 py-5 flex items-center gap-4"
                    style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                      style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                    >
                      {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                    </span>
                    <div
                      style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <PostGrid posts={filteredPosts} columns={3} />
                </>
              ) : (
                <EmptyState />
              )}
            </>
          )}

          {/* ── DEFAULT VIEW — editorial layout ── */}
          {!activeCategory && (
            <>
              {/* Featured hero */}
              {hero && <BlogHero post={hero} />}

              {/* Latest label */}
              {rest.length > 0 && (
                <SectionLabel label="Latest Posts" />
              )}

              {/* 3-col grid row 1 */}
              {gridRow1.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-3"
                  style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                >
                  {gridRow1.map((post) => (
                    <PostCard key={post._id} post={post} variant="default" />
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
                  {tallPost && <PostCard post={tallPost} variant="tall" />}
                </div>
              )}

              {/* 4-col list row */}
              {listPosts.length > 0 && (
                <>
                  <SectionLabel label="More Posts" />
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
                  >
                    {listPosts.map((post) => (
                      <PostCard key={post._id} post={post} variant="list" />
                    ))}
                  </div>
                </>
              )}

              {/* Overflow — 3-col grid */}
              {remainingPosts.length > 0 && (
                <PostGrid posts={remainingPosts} columns={3} />
              )}

              {/* Empty state */}
              {postsResult.length === 0 && <EmptyState />}
            </>
          )}

        </main>
        <BlogFooter />
      </>
    )
  }

  // ── Shared sub-components ──

  function SectionLabel({ label }: { label: string }) {
    return (
      <div
        className="px-6 md:px-12 py-5 flex items-center gap-4"
        style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }} />
      </div>
    )
  }

  function EmptyState() {
    return (
      <div className="px-6 md:px-12 py-32 flex flex-col items-center justify-center gap-4">
        <p
          className="text-[13px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
        >
          No posts found.
        </p>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.12em] no-underline transition-colors duration-200"
          style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
        >
          ← View all posts
        </Link>
      </div>
    )
  }