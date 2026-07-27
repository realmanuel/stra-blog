import type { Metadata } from 'next'
import Link from 'next/link'
import BlogNavbar from '@/components/BlogNavbar'
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

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams
  if (!category || category === 'all') return {}
  const label = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
  return { title: `${label} | Stra Journal` }
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const activeCategory = !category || category === 'all' ? undefined : category

  const [categories, featuredPost, postsResult] = await Promise.all([
    getAllCategories(),
    activeCategory ? Promise.resolve(null) : getFeaturedPost(),
    activeCategory ? getPostsByCategory(activeCategory) : getAllPosts(),
  ])

  const hero = activeCategory ? null : (featuredPost ?? postsResult[0] ?? null)
  const rest = hero ? postsResult.filter((p) => p.slug !== hero.slug) : postsResult

  const sellerSpotlight = !activeCategory
    ? (rest.find((p) => p.category.slug === 'seller-story') ?? null)
    : null

  const gridRow1       = rest.slice(0, 3)
  const widePost       = !activeCategory ? (rest[3] ?? null) : null
  const tallPost       = !activeCategory ? (rest[4] ?? null) : null
  const listPosts      = !activeCategory ? rest.slice(5, 9) : []
  const remainingPosts = !activeCategory ? rest.slice(9) : []
  const filteredPosts  = activeCategory ? rest : []

  return (
    <>
      <BlogNavbar />
      <main id="main-content">

        {/* ── Journal header ── */}
        <header
          className="px-6 md:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-12"
          style={{
            paddingTop: '152px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
          }}
        >
          <div className="flex-1">
            <div
              className="animate-fadeUp-1 text-[10px] uppercase tracking-[0.22em] mb-7 flex items-center gap-3"
              style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
            >
              <span
                style={{ width: '28px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }}
                aria-hidden="true"
              />
              Stra Journal
            </div>
            <h1
              className="animate-fadeUp-2 font-extrabold"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(48px, 6.5vw, 88px)',
                letterSpacing: '-0.04em',
                lineHeight: '0.94',
              }}
            >
              Stories, Updates
              <br />
              &{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(242,240,235,0.3)',
                }}
              >
                Spotlights
              </em>
            </h1>
          </div>

          <div className="animate-fadeUp-3 md:max-w-[300px] flex-shrink-0">
            <p
              className="text-[12px] leading-[1.95] mb-6"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.45)' }}
            >
              The official Stra publication. Platform updates, product spotlights,
              seller features, marketplace insights, and everything happening inside
              Nigeria&apos;s smartest secondhand market.
            </p>
            <span
              className="text-[10px] uppercase tracking-[0.14em] px-4 py-[10px] inline-block"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(242,240,235,0.28)',
                border: '1px solid rgba(242,240,235,0.08)',
                letterSpacing: '0.14em',
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

        {/* ── FILTERED VIEW ── */}
        {activeCategory && (
          <>
            {filteredPosts.length > 0 ? (
              <>
                <SectionLabel
                  label={`${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`}
                />
                <PostGrid posts={filteredPosts} columns={3} />
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}

        {/* ── DEFAULT EDITORIAL VIEW ── */}
        {!activeCategory && (
          <>
            {hero && <BlogHero post={hero} />}

            {rest.length > 0 && <SectionLabel label="Latest Posts" />}

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

            {sellerSpotlight && <SpotlightStrip post={sellerSpotlight} />}

            {(widePost || tallPost) && (
              <div
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr]"
                style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
              >
                {widePost && <PostCard post={widePost} variant="wide" />}
                {tallPost && <PostCard post={tallPost} variant="tall" />}
              </div>
            )}

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

            {remainingPosts.length > 0 && (
              <PostGrid posts={remainingPosts} columns={3} />
            )}

            {postsResult.length === 0 && <EmptyState />}
          </>
        )}

      </main>
      <BlogFooter />
    </>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      className="px-6 md:px-16 py-[18px] flex items-center gap-5"
      style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
      aria-hidden="true"
    >
      <span
        className="text-[10px] uppercase tracking-[0.22em] flex-shrink-0"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.06)' }} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="px-6 md:px-16 py-40 flex flex-col items-center justify-center gap-5">
      <p
        className="text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
      >
        No posts found.
      </p>
      <Link
        href="/"
        className="text-[10px] uppercase tracking-[0.14em] no-underline transition-colors duration-200"
        style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
      >
        ← View all posts
      </Link>
    </div>
  )
}

