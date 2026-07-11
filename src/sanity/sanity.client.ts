import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

// Public client (used in components)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
})

// Server client (used in page fetching)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN,
})

// Image URL builder
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: unknown) {
  return builder.image(source)
}

// Typed fetch helper
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  fallback,
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number
  fallback: T
}): Promise<T> {
  try {
    const result = await serverClient.fetch<T>(query, params, {
      next: { revalidate },
    })

    return result ?? fallback
  } catch (error) {
    console.error('[Sanity]', error)
    return fallback
  }
}