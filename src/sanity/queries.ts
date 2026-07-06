import { serverClient } from './sanity.client'
import type { SanityPost, SanityCategory } from './types'

async function safeFetch<T>(
  query: string, 
  params: Record<string, unknown> | undefined, 
  fallback: T
): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return fallback
  }

  try {
    // We add an empty object {} if params is undefined, 
    // followed by our Next.js caching rules!
    return (await serverClient.fetch(
      query, 
      params || {}, 
      { next: { revalidate: 10 } } // <-- Refreshes the cache every 10 seconds
    )) as T
  } catch (error) {
    console.warn('[sanity] query failed, falling back to empty data', error)
    return fallback
  }
}

// All posts — newest first
export async function getAllPosts(): Promise<SanityPost[]> {
  return safeFetch<SanityPost[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      featured,
      coverImage { asset, alt },
      category-> { title, "slug": slug.current },
      author-> { name, role, avatar }
    }
  `, undefined, [])
}

// Single post by slug — includes full body
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return safeFetch<SanityPost | null>(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      featured,
      coverImage { asset, alt },
      category-> { title, "slug": slug.current },
      author-> { name, role, avatar },
      body
    }
  `, { slug }, null)
}

// Featured post — most recent with featured: true
export async function getFeaturedPost(): Promise<SanityPost | null> {
  return safeFetch<SanityPost | null>(`
    *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      featured,
      coverImage { asset, alt },
      category-> { title, "slug": slug.current },
      author-> { name, role, avatar }
    }
  `, undefined, null)
}

// Posts by category slug
export async function getPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  return safeFetch<SanityPost[]>(`
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      featured,
      coverImage { asset, alt },
      category-> { title, "slug": slug.current },
      author-> { name, role, avatar }
    }
  `, { categorySlug }, [])
}

// Related posts — same category, exclude current
export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string,
  limit: number = 3
): Promise<SanityPost[]> {
  return safeFetch<SanityPost[]>(`
    *[
      _type == "post" &&
      slug.current != $currentSlug &&
      category->slug.current == $categorySlug
    ] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      coverImage { asset, alt },
      category-> { title, "slug": slug.current },
      author-> { name, role, avatar }
    }
  `, { currentSlug, categorySlug, limit }, [])
}

// All categories
export async function getAllCategories(): Promise<SanityCategory[]> {
  return safeFetch<SanityCategory[]>(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }
  `, undefined, [])
}

// All slugs for generateStaticParams
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return safeFetch<{ slug: string }[]>(`
    *[_type == "post"] { "slug": slug.current }
  `, undefined, [])
}