export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface SanityAuthor {
  _id: string
  name: string
  role?: string
  avatar?: SanityImage
}

// Portable Text block types
export interface SanitySpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

export interface SanityMarkDef {
  _type: string
  _key: string
  href?: string
}

export interface SanityTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h2' | 'h3' | 'blockquote'
  children: SanitySpan[]
  markDefs: SanityMarkDef[]
}

export interface SanityImageBlock {
  _type: 'image'
  _key: string
  asset: SanityImageAsset
  alt?: string
  caption?: string
}

export interface SanityCalloutBlock {
  _type: 'callout'
  _key: string
  text: string
}

export type SanityBlock = SanityTextBlock | SanityImageBlock | SanityCalloutBlock

export interface SanityPost {
  _id: string
  _updatedAt: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime?: string
  featured?: boolean
  coverImage?: SanityImage
  category: SanityCategory
  author: SanityAuthor
  body?: SanityBlock[]
}

export interface SanityPostStub {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime?: string
  featured?: boolean
  coverImage?: SanityImage
  category: SanityCategory
  author: Pick<SanityAuthor, 'name' | 'role' | 'avatar'>
}