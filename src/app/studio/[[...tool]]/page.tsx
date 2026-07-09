'use client'

/**
 * Sanity Studio — accessed at /studio
 * Must be a client component. Do NOT add public routing to this.
 */
import dynamic from 'next/dynamic'
import config from '@/sanity/sanity.config'

export const dynamicRendering = 'force-dynamic'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}