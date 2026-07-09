'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal(
  selector = '.reveal',
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px',
      ...options,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay per batch of 4
          const delay = (i % 4) * 90
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, delay)
          observerRef.current?.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    const elements = document.querySelectorAll<HTMLElement>(selector)
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector])
}