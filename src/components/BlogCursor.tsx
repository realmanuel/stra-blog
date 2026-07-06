    'use client'

    import { useEffect, useRef } from 'react'

    export default function BlogCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const mousePos = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const cursor = cursorRef.current
        const ring = ringRef.current
        if (!cursor || !ring) return

        const onMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
        }

        const animateRing = () => {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1
        ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
        rafRef.current = requestAnimationFrame(animateRing)
        }

        const onEnterLink = () => {
        cursor.classList.add('cursor--link')
        ring.classList.add('cursor-ring--link')
        }

        const onLeaveLink = () => {
        cursor.classList.remove('cursor--link')
        ring.classList.remove('cursor-ring--link')
        }

        const attachToLinks = () => {
        document.querySelectorAll('a, button').forEach((el) => {
            el.addEventListener('mouseenter', onEnterLink)
            el.addEventListener('mouseleave', onLeaveLink)
        })
        }

        document.addEventListener('mousemove', onMove)
        attachToLinks()
        rafRef.current = requestAnimationFrame(animateRing)

        // Re-attach when DOM updates (for dynamic content)
        const observer = new MutationObserver(attachToLinks)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
        document.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(rafRef.current)
        observer.disconnect()
        }
    }, [])

    return (
        <>
        <div ref={cursorRef} className="cursor" />
        <div ref={ringRef} className="cursor-ring" />
        </>
    )
    }