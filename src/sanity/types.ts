export interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
  caption?: string
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface SanityAuthor {
  name: string
  role: string
  avatar?: SanityImage
}

export interface SanityBlock {
  _type: 'block' | 'image' | 'callout'
  _key: string
  style?: string
  children?: Array<{
    _type: string
    _key: string
    text: string
    marks: string[]
  }>
  markDefs?: unknown[]
  // image block
  asset?: unknown
  alt?: string
  caption?: string
  // callout block
  text?: string
}

export interface SanityPost {
  _id: string
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