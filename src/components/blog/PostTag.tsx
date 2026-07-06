    import { CATEGORY_LABELS, CATEGORY_STYLES, resolveCategorySlug } from '@/lib/posts'

    interface PostTagProps {
    category: string | { slug?: string } | undefined
    size?: 'sm' | 'md'
    }

    export default function PostTag({ category, size = 'md' }: PostTagProps) {
    const normalizedCategory = resolveCategorySlug(category as any)
    const style = CATEGORY_STYLES[normalizedCategory]
    const label = CATEGORY_LABELS[normalizedCategory]

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