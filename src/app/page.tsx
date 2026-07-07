import BlogNavbar from '@/components/BlogNavbar'
import BlogFooter from '@/components/BlogFooter'
import BlogHero from '@/components/blog/BlogHero'
import PostCard from '@/components/blog/PostCard'
import CategoryBar from '@/components/blog/CategoryBar'
import SpotlightStrip from '@/components/blog/SpotlightStrip'
import {
  getAllPosts,
  getFeaturedPost,
  getAllCategories,
} from '@/sanity/queries'

export const revalidate = 60

export default async function BlogIndexPage() {
  const [allPosts, featuredPost, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getAllCategories(),
  ])

  const hero = featuredPost ?? allPosts[0] ?? null
  const rest = hero ? allPosts.filter((p) => p.slug !== hero.slug) : allPosts

  const sellerSpotlight = rest.find((p) => p.category.slug === 'seller-story') ?? null

  const gridRow1 = rest.slice(0, 3)
  const widePost = rest[3] ?? null
  const tallPost = rest[4] ?? null
  const listPosts = rest.slice(5, 9)
  const remainingPosts = rest.slice(9)

  return (
    <>
      <BlogNavbar />
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
              marketplace insights, and everything happening inside Nigeria&apos;s smartest secondhand market.
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
        <CategoryBar categories={categories} />

        {/* Featured hero */}
        {hero && <BlogHero post={hero} />}

        {/* Section label */}
        {rest.length > 0 && (
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
        )}

        {/* 3-col grid */}
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

        {/* Seller spotlight */}
        {sellerSpotlight && <SpotlightStrip post={sellerSpotlight} />}

        {/* Wide + tall */}
        {(widePost || tallPost) && (
          <div
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr]"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
          >
            {widePost && <PostCard post={widePost} variant="wide" />}
            {tallPost && <PostCard post={tallPost} variant="tall" />}
          </div>
        )}

        {/* 4-col list */}
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
                <PostCard key={post._id} post={post} variant="list" />
              ))}
            </div>
          </>
        )}

        {/* Overflow */}
        {remainingPosts.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
          >
            {remainingPosts.map((post) => (
              <PostCard key={post._id} post={post} variant="default" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {allPosts.length === 0 && (
          <div
            className="px-6 md:px-12 py-32 text-center"
          >
            <p
              className="text-[13px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
              No posts published yet. Check back soon.
            </p>
          </div>
        )}

      </main>
      <BlogFooter />
    </>
  )
}