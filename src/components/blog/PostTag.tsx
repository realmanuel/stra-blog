    import { CATEGORY_LABELS, CATEGORY_STYLES, resolveCategorySlug } from '@/lib/posts'

    interface PostTagProps {
    category: string | { slug?: string } | undefined
    size?: 'sm' | 'md'
    }

    // 1. Create a neutral fallback style for unknown/missing categories
    const FALLBACK_STYLE = {
    bg: 'rgba(242,240,235,0.05)',
    border: 'rgba(242,240,235,0.15)',
    color: 'rgba(242,240,235,0.7)',
    }

    export default function PostTag({ category, size = 'md' }: PostTagProps) {
    const normalizedCategory = resolveCategorySlug(category as any)
    
    // 2. Safely grab the style & label, or use the fallbacks if undefined
    const style = CATEGORY_STYLES[normalizedCategory] || FALLBACK_STYLE
    const label = CATEGORY_LABELS[normalizedCategory] || normalizedCategory || 'Uncategorized'

    return (
        <span
        style={{
            fontFamily: 'var(--font-mono)',
            fontSize: size === 'sm' ? '9px' : '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: size === 'sm' ? '4px 8px' : '6px 12px',
            border: `1px solid ${style.border}`,
            background: style.bg,
            color: style.color,
            flexShrink: 0,
            display: 'inline-block',
        }}
        >
        {label}
        </span>
    )
    }