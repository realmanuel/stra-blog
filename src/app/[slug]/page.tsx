import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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
import Image from 'next/image'
import Link from 'next/link'

const BASE_URL = 'https://blog.gestra.ng'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs
      .filter((s) => Boolean(s.slug))
      .map((s) => ({ slug: s.slug }))
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
      robots: { index: false },
    }
  }

  const ogImage = post.coverImage
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
      authors: [post.author.name],
      tags: [post.category.title],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImage?.alt ?? post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch post — if null, show 404
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Parallel fetch for related + all posts
  const [related, allPosts] = await Promise.all([
    getRelatedPosts(post.slug, post.category.slug, 2),
    getAllPosts(),
  ])

  // Fill sidebar up to 3 with non-duplicate posts from other categories
  const usedSlugs = new Set([post.slug, ...related.map((r) => r.slug)])
  const others = allPosts
    .filter((p) => !usedSlugs.has(p.slug))
    .slice(0, Math.max(0, 3 - related.length))

  const sidebarPosts = [...related, ...others].slice(0, 3)
  const formattedDate = formatDate(post.publishedAt)

  return (
    <>
      <PostJsonLd post={post} />
      <BlogNavbar />
      <main>

        {/* ── Breadcrumb ── */}
        <div
          className="px-6 md:px-12 flex items-center gap-3 flex-wrap"
          style={{
            paddingTop: '88px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(242,240,235,0.08)',
          }}
        >
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.15em] no-underline transition-colors duration-200 text-[rgba(242,240,235,0.35)] hover:text-[#C8FF00]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← Stra Journal
        </Link>
          <span
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(242,240,235,0.2)' }}
          >
            /
          </span>
          <PostTag category={post.category.slug as Parameters<typeof PostTag>[0]['category']} />
        </div>

        {/* ── Post hero ── */}
        <header
          className="px-6 md:px-12 py-14 md:py-20"
          style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <PostTag category={post.category.slug as Parameters<typeof PostTag>[0]['category']} />
            <span
              className="text-[10px] tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
              {formattedDate}
            </span>
            {post.readTime && (
              <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
              >
                · {post.readTime}
              </span>
            )}
          </div>

          <h1
            className="font-extrabold leading-[0.95] mb-8 max-w-[860px]"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(32px, 5vw, 72px)',
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
            className="flex items-center justify-between pt-8 flex-wrap gap-6"
            style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  background: 'rgba(200,255,0,0.08)',
                  border: '1px solid rgba(200,255,0,0.2)',
                }}
              >
                {post.author.avatar ? (
                  <Image
                    src={urlFor(post.author.avatar).width(80).height(80).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
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
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                  >
                    {post.author.role}
                  </div>
                )}
              </div>
            </div>

            <time
              dateTime={post.publishedAt}
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
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
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(200,255,0,0.06) 0%, transparent 50%), linear-gradient(to bottom, #1A1A22, #030305)',
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
            </div>
          )}
        </div>

        {/* ── Body + sidebar ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_300px]"
          style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
          {/* Article */}
          <article
            className="px-6 md:px-12 py-14 md:py-20 min-w-0"
            style={{ borderRight: '1px solid rgba(242,240,235,0.08)' }}
          >
            {post.body && post.body.length > 0 ? (
              <PostBody blocks={post.body} />
            ) : (
              <p
                className="text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
              >
                Content coming soon.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-0 sticky-sidebar">
            <div className="sticky top-[88px] p-8 flex flex-col gap-10">

              {/* Related posts */}
              {sidebarPosts.length > 0 && (
                <div>
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                  >
                    <span style={{ width: '16px', height: '1px', background: 'rgba(242,240,235,0.3)', display: 'block', flexShrink: 0 }} />
                    Related Posts
                  </div>
                  <nav aria-label="Related posts">
                    {sidebarPosts.map((relatedPost, i) => (
                      <Link
                        key={relatedPost._id}
                        href={`/${relatedPost.slug}`}
                        className="block no-underline pb-5 mb-5 group transition-opacity duration-200 hover:opacity-70"
                        style={{
                          borderBottom:
                            i < sidebarPosts.length - 1
                              ? '1px solid rgba(242,240,235,0.08)'
                              : 'none',
                          color: 'inherit',
                        }}
                      >
                        <div className="mb-2">
                          <PostTag
                            category={relatedPost.category?.slug as Parameters<typeof PostTag>[0]['category']}
                            size="sm"
                          />
                        </div>
                        <div
                          className="text-[13px] font-semibold leading-[1.3] mb-2"
                          style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.01em' }}
                        >
                          {relatedPost.title}
                        </div>
                        <div
                          className="text-[10px]"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(242,240,235,0.3)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          <time dateTime={relatedPost.publishedAt}>
                            {formatDate(relatedPost.publishedAt)}
                          </time>
                          {relatedPost.readTime && ` · ${relatedPost.readTime}`}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

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
                  className="text-[11px] leading-[1.8] mb-5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                >
                  The official Stra publication | platform updates, seller stories, product spotlights, and marketplace insights written by the Stra team.
                </p>
                <a
                  href="https://www.gestra.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] no-underline transition-colors duration-200 text-[rgba(242,240,235,0.35)] hover:text-[#C8FF00]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Visit gestra.ng
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