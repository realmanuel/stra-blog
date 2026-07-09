  'use client'

  import { useState, useTransition } from 'react'
  import { useRouter } from 'next/navigation'
  import type { SanityCategory } from '@/sanity/types'

  interface CategoryBarProps {
    categories: SanityCategory[]
    activeCategory?: string
  }

  export default function CategoryBar({ categories, activeCategory }: CategoryBarProps) {
    const router = useRouter()
    const [active, setActive] = useState(activeCategory ?? 'all')
    const [, startTransition] = useTransition()

    function handleClick(slug: string) {
      setActive(slug)
      startTransition(() => {
        if (slug === 'all') {
          router.push('/')
        } else {
          router.push(`/?category=${slug}`)
        }
      })
    }

    const allOptions = [
      { _id: 'all', title: 'All Posts', slug: 'all' },
      ...categories,
    ]

    return (
      <nav
        aria-label="Filter posts by category"
        className="flex overflow-x-auto"
        style={{
          borderBottom: '1px solid rgba(242,240,235,0.08)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {allOptions.map((cat) => {
          const isActive = active === cat.slug
          return (
            <button
              key={cat._id}
              onClick={() => handleClick(cat.slug)}
              aria-pressed={isActive}
              aria-label={`Filter by ${cat.title}`}
              className="flex-shrink-0 transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                background: isActive ? 'rgba(200,255,0,0.04)' : 'transparent',
                color: isActive ? '#C8FF00' : 'rgba(242,240,235,0.5)',
                border: 'none',
                borderRight: '1px solid rgba(242,240,235,0.08)',
                borderBottom: isActive ? '2px solid #C8FF00' : '2px solid transparent',
                cursor: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.title}
            </button>
          )
        })}
      </nav>
    )
  }