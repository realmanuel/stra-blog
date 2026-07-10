import { createClient, type QueryParams } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET


if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')

// Public CDN client — used for non-sensitive reads in components
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})

// Server client — used for page data fetches, bypasses CDN for freshness
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type-safe fetch wrapper with built-in error handling
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  fallback,
}: {
  query: string
  params?: QueryParams
  revalidate?: number
  fallback: T
}): Promise<T> {
  // Guard — never throw in production, always return fallback
  if (!projectId || !dataset) {
    console.warn('[sanity] Missing env vars — returning fallback')
    return fallback
  }

  try {
    const result = await serverClient.fetch<T>(query, params, {
      next: { revalidate },
    })

    // GROQ returns null for [0] queries when nothing matches
    if (result === null || result === undefined) {
      return fallback
    }

    return result
  } catch (err) {
    console.error('[sanity] fetch failed:', err)
    return fallback
  }
}