    import { createClient } from '@sanity/client'
    import imageUrlBuilder from '@sanity/image-url'

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // always fresh on server
  token: process.env.SANITY_API_TOKEN,
})

    const builder = imageUrlBuilder(serverClient)

    export function urlFor(source: unknown) {
    return builder.image(source as any)
    }