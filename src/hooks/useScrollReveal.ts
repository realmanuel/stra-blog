    'use client'

    import { useEffect } from 'react'

    export function useScrollReveal() {
    useEffect(() => {
        const reveals = document.querySelectorAll<HTMLElement>('.reveal')

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                entry.target.classList.add('visible')
                }, (i % 4) * 100)
                observer.unobserve(entry.target)
            }
            })
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
        )

        reveals.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])
    }