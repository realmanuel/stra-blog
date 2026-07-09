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
        cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
        }

        const animateRing = () => {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
        ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
        rafRef.current = requestAnimationFrame(animateRing)
        }

        const onEnter = () => {
        ring.style.width = '60px'
        ring.style.height = '60px'
        }

        const onLeave = () => {
        ring.style.width = '40px'
        ring.style.height = '40px'
        }

        const attachListeners = () => {
        document.querySelectorAll('a, button').forEach((el) => {
            el.removeEventListener('mouseenter', onEnter)
            el.removeEventListener('mouseleave', onLeave)
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })
        }

        document.addEventListener('mousemove', onMove)
        attachListeners()
        rafRef.current = requestAnimationFrame(animateRing)

        // Re-attach when DOM mutates (dynamic content)
        const observer = new MutationObserver(attachListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
        document.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(rafRef.current)
        observer.disconnect()
        }
    }, [])

    return (
        <>
        <div ref={cursorRef} className="cursor" aria-hidden="true" />
        <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    )
    }