import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BlogNavbar from '@/components/BlogNavbar'
import BlogFooter from '@/components/BlogFooter'
import PostBody from '@/components/blog/PostBody'
import PostTag from '@/components/blog/PostTag'
import PostCard from '@/components/blog/PostCard'
import PostJsonLd from '@/components/blog/PostJsonLd'
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getAllPosts,
} from '@/sanity/queries'
import { urlFor } from '@/sanity/sanity.client'
import { formatDate } from '@/lib/posts'

export const revalidate = 60
export const dynamicParams = true

const BASE_URL = 'https://blog.gestra.ng'

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.filter((s) => Boolean(s?.slug)).map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    }
  }

  const ogImage = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : `${BASE_URL}/og-image.png`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author.name],
      tags: [post.category.title],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.coverImage?.alt ?? post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const [related, allPosts] = await Promise.all([
    getRelatedPosts(post.slug, post.category.slug),
    getAllPosts(),
  ])

  const usedSlugs = new Set([post.slug, ...related.map((r) => r.slug)])
  const fillPosts = allPosts
    .filter((p) => !usedSlugs.has(p.slug))
    .slice(0, Math.max(0, 3 - related.length))

  const sidebarPosts = [...related, ...fillPosts].slice(0, 3)
  const formattedDate = formatDate(post.publishedAt)

  return (
    <>
      <PostJsonLd post={post} />
      <BlogNavbar />

      <main id="main-content">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="px-6 md:px-16 flex items-center gap-3 flex-wrap"
          style={{
            paddingTop: '84px',
            paddingBottom: '18px',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
          }}
        >
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.14em] no-underline transition-colors duration-200 hover:tracking-[0.18em] hover:text-[#d4ff1a]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}

          >
            ← Stra Journal
          </Link>
          <span
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(242,240,235,0.2)' }}
            aria-hidden="true"
          >
            /
          </span>
          <PostTag categorySlug={post.category.slug} />
        </nav>

        {/* ── Post hero ── */}
        <header
          className="px-6 md:px-16"
          style={{
            paddingTop: '64px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
          }}
        >
          {/* Meta */}
          <div className="flex items-center gap-4 mb-7 flex-wrap">
            <PostTag categorySlug={post.category.slug} />
            <time
              dateTime={post.publishedAt}
              className="text-[10px] tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
              {formattedDate}
            </time>
            {post.readTime && (
              <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
              >
                · {post.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-extrabold mb-7"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(30px, 4.8vw, 68px)',
              letterSpacing: '-0.04em',
              lineHeight: '0.97',
              maxWidth: '860px',
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-[13px] leading-[1.95] mb-10"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'rgba(242,240,235,0.48)',
              maxWidth: '580px',
            }}
          >
            {post.excerpt}
          </p>

          {/* Author row */}
          <div
            className="flex items-center justify-between pt-7 flex-wrap gap-5"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  background: 'rgba(200,255,0,0.07)',
                  border: '1px solid rgba(200,255,0,0.18)',
                }}
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
                  <span className="text-sm" aria-hidden="true">✍️</span>
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
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.32)' }}
                  >
                    {post.author.role}
                  </div>
                )}
              </div>
            </div>

            <time
              dateTime={post.publishedAt}
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
            >
              {formattedDate}
            </time>
          </div>
        </header>

        {/* ── Cover image ── */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            aspectRatio: '21/9',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
          }}
        >
          {post.coverImage?.asset ? (
            <Image
              src={urlFor(post.coverImage).width(1800).height(780).url()}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div
              className="w-full h-full relative"
              style={{
                background:
                  'linear-gradient(135deg, rgba(200,255,0,0.05) 0%, transparent 50%), linear-gradient(to bottom, #1A1A22, #030305)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(242,240,235,0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(242,240,235,0.025) 1px, transparent 1px)
                  `,
                  backgroundSize: '80px 80px',
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* ── Body + Sidebar ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_280px]"
          style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
          {/* Article */}
          <article
            className="min-w-0"
            style={{
              padding: 'clamp(40px, 5vw, 80px) clamp(24px, 5vw, 64px)',
              borderRight: '1px solid rgba(242,240,235,0.08)',
            }}
          >
            {post.body && post.body.length > 0 ? (
              <PostBody blocks={post.body} />
            ) : (
              <p
                className="text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
              >
                Content coming soon.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-[84px] flex flex-col gap-8 p-8">

              {/* Related posts */}
              {sidebarPosts.length > 0 && (
                <div>
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-3"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
                  >
                    <span
                      style={{ width: '14px', height: '1px', background: 'rgba(242,240,235,0.28)', display: 'block', flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    Related
                  </div>
                  <nav aria-label="Related posts">
                    {sidebarPosts.map((relatedPost, i) => (
                      <Link
                        key={relatedPost._id}
                        href={`/${relatedPost.slug}`}
                        className="block no-underline transition-opacity duration-200 hover:opacity-60"
                        style={{
                          color: 'inherit',
                          paddingBottom: i < sidebarPosts.length - 1 ? '20px' : '0',
                          marginBottom: i < sidebarPosts.length - 1 ? '20px' : '0',
                          borderBottom:
                            i < sidebarPosts.length - 1
                              ? '1px solid rgba(242,240,235,0.06)'
                              : 'none',
                        }}
                      >
                        <div className="mb-[6px]">
                          <PostTag
                            categorySlug={relatedPost.category?.slug ?? 'uncategorised'}
                            size="sm"
                          />
                        </div>
                        <p
                          className="text-[12px] font-semibold leading-[1.35] mb-[6px]"
                          style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.01em' }}
                        >
                          {relatedPost.title}
                        </p>
                        <time
                          dateTime={relatedPost.publishedAt}
                          className="text-[10px]"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(242,240,235,0.28)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {formatDate(relatedPost.publishedAt)}
                          {relatedPost.readTime && ` · ${relatedPost.readTime}`}
                        </time>
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              {/* About */}
              <div style={{ borderTop: '1px solid rgba(242,240,235,0.07)', paddingTop: '28px' }}>
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
                >
                  <span
                    style={{ width: '14px', height: '1px', background: 'rgba(242,240,235,0.28)', display: 'block', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  About
                </div>
                <p
                  className="text-[11px] leading-[1.85] mb-5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.38)' }}
                >
                  The official Stra publication — platform updates, seller stories,
                  product spotlights, and marketplace insights.
                </p>
                <a
                  href="https://www.gestra.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] no-underline transition-colors duration-200 hover:tracking-[0.18em] hover:text-[#d4ff1a]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.32)' }}
                >
                  gestra.ng
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

            </div>
          </aside>
        </div>

        {/* ── More from Journal ── */}
        {sidebarPosts.length > 0 && (
          <section aria-label="More from Stra Journal">
            <div
              className="px-6 md:px-16 py-[18px] flex items-center gap-5"
              style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.22em] flex-shrink-0"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.28)' }}
              >
                More from Stra Journal
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.06)' }} />
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
              {sidebarPosts.map((p) => (
                <PostCard key={p._id} post={p} variant="default" />
              ))}
            </div>
          </section>
        )}

      </main>
      <BlogFooter />
    </>
  )
}

