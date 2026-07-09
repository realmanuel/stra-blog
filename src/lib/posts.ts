export type CategorySlug =
  | 'update'
  | 'spotlight'
  | 'seller-story'
  | 'tips'
  | 'industry'
  | 'uncategorised'

export interface CategoryMeta {
  label: string
  color: string
  border: string
  bg: string
}

export const CATEGORY_META: Record<CategorySlug, CategoryMeta> = {
  update: {
    label: 'Platform Update',
    color: '#C8FF00',
    border: 'rgba(200,255,0,0.3)',
    bg: 'rgba(200,255,0,0.05)',
  },
  spotlight: {
    label: 'Product Spotlight',
    color: '#C8A0FF',
    border: 'rgba(200,160,255,0.3)',
    bg: 'rgba(200,160,255,0.05)',
  },
  'seller-story': {
    label: 'Seller Story',
    color: '#FF8C42',
    border: 'rgba(255,140,66,0.3)',
    bg: 'rgba(255,140,66,0.05)',
  },
  tips: {
    label: 'Platform Tips',
    color: '#42D4FF',
    border: 'rgba(66,212,255,0.3)',
    bg: 'rgba(66,212,255,0.05)',
  },
  industry: {
    label: 'Industry',
    color: 'rgba(242,240,235,0.5)',
    border: 'rgba(242,240,235,0.15)',
    bg: 'transparent',
  },
  uncategorised: {
    label: 'Uncategorised',
    color: 'rgba(242,240,235,0.3)',
    border: 'rgba(242,240,235,0.08)',
    bg: 'transparent',
  },
}

export function getCategoryMeta(slug: string): CategoryMeta {
  return (
    CATEGORY_META[slug as CategorySlug] ?? CATEGORY_META['uncategorised']
  )
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getCardGradient(categorySlug: string): string {
  const meta = getCategoryMeta(categorySlug)
  // Convert rgba bg to a slightly stronger gradient
  const color = meta.color.startsWith('#')
    ? hexToRgba(meta.color, 0.1)
    : meta.bg.replace('0.05', '0.1')
  return `linear-gradient(135deg, ${color} 0%, rgba(3,3,5,1) 100%)`
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}