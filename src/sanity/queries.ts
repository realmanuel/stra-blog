import { client } from './sanity.client'
import type { SanityPost, SanityCategory } from './types'

// All posts — newest first
export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(`
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
  `)
}

// Single post by slug — includes full body
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(`
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
  `, { slug })
}

// Featured post — most recent with featured: true
export async function getFeaturedPost(): Promise<SanityPost | null> {
  return client.fetch(`
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
  `)
}

// Posts by category slug
export async function getPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  return client.fetch(`
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
  `, { categorySlug })
}

// Related posts — same category, exclude current
export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string,
  limit: number = 3
): Promise<SanityPost[]> {
  return client.fetch(`
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
  `, { currentSlug, categorySlug, limit })
}

// All categories
export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }
  `)
}

// All slugs for generateStaticParams
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`
    *[_type == "post"] { "slug": slug.current }
  `)
}