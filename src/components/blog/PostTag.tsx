    import { getCategoryMeta } from '@/lib/posts'

    interface PostTagProps {
    categorySlug: string
    size?: 'sm' | 'md'
    }

    export default function PostTag({ categorySlug, size = 'md' }: PostTagProps) {
    const meta = getCategoryMeta(categorySlug)

    return (
        <span
        style={{
            fontFamily: 'var(--font-mono)',
            fontSize: size === 'sm' ? '9px' : '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: size === 'sm' ? '4px 8px' : '6px 12px',
            border: `1px solid ${meta.border}`,
            background: meta.bg,
            color: meta.color,
            flexShrink: 0,
            display: 'inline-block',
            whiteSpace: 'nowrap',
        }}
        >
        {meta.label}
        </span>
    )
    }