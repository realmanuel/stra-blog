    import type { MetadataRoute } from 'next'
    import { getAllPostSlugs } from '@/sanity/queries'

    const BASE_URL = 'https://blog.gestra.ng'

    export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await getAllPostSlugs()

    const postRoutes = slugs.map(({ slug }) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        },
        ...postRoutes,
    ]
    }