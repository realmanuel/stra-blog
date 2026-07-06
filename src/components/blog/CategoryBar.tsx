'use client'

import { useState } from 'react'
import type { SanityCategory } from '@/sanity/types'

interface CategoryBarProps {
  categories: SanityCategory[]
  onFilter?: (slug: string | 'all') => void
}

export default function CategoryBar({ categories, onFilter }: CategoryBarProps) {
  const [active, setActive] = useState<string>('all')

  function handleClick(slug: string) {
    setActive(slug)
    onFilter?.(slug)
  }

  const allCats = [
    { slug: 'all', title: 'All Posts' },
    ...categories,
  ]

  return (
    <div
      className="flex overflow-x-auto"
      style={{
        borderBottom: '1px solid rgba(242,240,235,0.08)',
        scrollbarWidth: 'none',
      }}
    >
      {allCats.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleClick(cat.slug)}
          className="flex-shrink-0 transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '18px 24px',
            background: active === cat.slug ? 'rgba(200,255,0,0.04)' : 'transparent',
            color: active === cat.slug ? '#C8FF00' : 'rgba(242,240,235,0.5)',
            border: 'none',
            borderRight: '1px solid rgba(242,240,235,0.08)',
            cursor: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {cat.title}
        </button>
      ))}
    </div>
  )
}