import { sanityFetch } from './sanity.client'
import type { SanityPost, SanityPostStub, SanityCategory } from './types'
// Safe category projection — if the referenced category doc is missing
// or unpublished, the post is NOT dropped. It gets an Uncategorised fallback.
const CATEGORY_FRAGMENT = /* groq */ `
  "category": select(
    defined(category->_id) => {
      "_id": category->_id,
      "title": category->title,
      "slug": category->slug.current
    },
    {
      "_id": "uncategorised",
      "title": "Uncategorised",
      "slug": "uncategorised"
    }
  )
`

// Safe author projection — same pattern
const AUTHOR_FRAGMENT = /* groq */ `
  "author": select(
    defined(author->_id) => {
      "_id": author->_id,
      "name": author->name,
      "role": author->role,
      "avatar": author->avatar
    },
    {
      "_id": "unknown",
      "name": "Ark Team",
      "role": "Official"
    }
  )
`

// Fields shared between stub (list) and full post queries
const POST_STUB_FIELDS = /* groq */ `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readTime,
  featured,
  coverImage { asset, alt },
  ${CATEGORY_FRAGMENT},
  ${AUTHOR_FRAGMENT}
`

// ─────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────

// All published posts, newest first
// Only includes posts with a valid slug
export async function getAllPosts(): Promise<SanityPostStub[]> {
  return sanityFetch<SanityPostStub[]>({
    query: /* groq */ `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt)
      ] | order(publishedAt desc) {
        ${POST_STUB_FIELDS}
      }
    `,
    revalidate: 60,
    fallback: [],
  })
}

// Single featured post — most recently published featured post
export async function getFeaturedPost(): Promise<SanityPostStub | null> {
  return sanityFetch<SanityPostStub | null>({
    query: /* groq */ `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        featured == true
      ] | order(publishedAt desc)[0] {
        ${POST_STUB_FIELDS}
      }
    `,
    revalidate: 60,
    fallback: null,
  })
}

// Single post by slug — full body included
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityFetch<SanityPost | null>({
    query: /* groq */ `
      *[
        _type == "post" &&
        slug.current == $slug &&
        defined(publishedAt)
      ][0] {
        ${POST_STUB_FIELDS},
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          }
        }
      }
    `,
    params: { slug },
    revalidate: 60,
    fallback: null,
  })
}

// Posts by category slug
export async function getPostsByCategory(
  categorySlug: string
): Promise<SanityPostStub[]> {
  return sanityFetch<SanityPostStub[]>({
    query: /* groq */ `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        category->slug.current == $categorySlug
      ] | order(publishedAt desc) {
        ${POST_STUB_FIELDS}
      }
    `,
    params: { categorySlug },
    revalidate: 60,
    fallback: [],
  })
}

// Related posts — same category, exclude current slug, max 3
export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string
): Promise<SanityPostStub[]> {
  return sanityFetch<SanityPostStub[]>({
    query: /* groq */ `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        slug.current != $currentSlug &&
        category->slug.current == $categorySlug
      ] | order(publishedAt desc)[0..2] {
        ${POST_STUB_FIELDS}
      }
    `,
    params: { currentSlug, categorySlug },
    revalidate: 60,
    fallback: [],
  })
}

// All categories with at least one published post
export async function getAllCategories(): Promise<SanityCategory[]> {
  return sanityFetch<SanityCategory[]>({
    query: /* groq */ `
      *[
        _type == "category" &&
        defined(slug.current) &&
        count(*[_type == "post" && references(^._id) && defined(publishedAt)]) > 0
      ] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        description
      }
    `,
    revalidate: 60,
    fallback: [],
  })
}

// All slugs for generateStaticParams at build time
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>({
    query: /* groq */ `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt)
      ] {
        "slug": slug.current
      }
    `,
    revalidate: 3600,
    fallback: [],
  })
}