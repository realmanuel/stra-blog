    'use client'

    import { useState } from 'react'
    import { Category, CATEGORY_LABELS } from '@/lib/posts'

    interface CategoryBarProps {
    onFilter: (category: Category | 'all') => void
    }

    const CATEGORIES: Array<{ key: Category | 'all'; label: string }> = [
    { key: 'all', label: 'All Posts' },
    { key: 'update', label: 'Updates' },
    { key: 'spotlight', label: 'Product Spotlights' },
    { key: 'seller-story', label: 'Seller Stories' },
    { key: 'tips', label: 'Platform Tips' },
    { key: 'industry', label: 'Industry' },
    ]

    export default function CategoryBar({ onFilter }: CategoryBarProps) {
    const [active, setActive] = useState<Category | 'all'>('all')

    function handleClick(key: Category | 'all') {
        setActive(key)
        onFilter(key)
    }

    return (
        <div
        className="flex overflow-x-auto"
        style={{
            borderBottom: '1px solid rgba(242,240,235,0.08)',
            scrollbarWidth: 'none',
        }}
        >
        {CATEGORIES.map((cat) => (
            <button
            key={cat.key}
            onClick={() => handleClick(cat.key)}
            className="flex-shrink-0 transition-colors duration-200"
            style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                background: active === cat.key ? 'rgba(200,255,0,0.04)' : 'transparent',
                color: active === cat.key ? '#C8FF00' : 'rgba(242,240,235,0.5)',
                border: 'none',
                borderRight: '1px solid rgba(242,240,235,0.08)',
                cursor: 'none',
                whiteSpace: 'nowrap',
            }}
            >
            {cat.label}
            </button>
        ))}
        </div>
    )
    }