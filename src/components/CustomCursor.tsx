    'use client'

    import { useEffect, useRef } from 'react'

    export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })
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

        document.addEventListener('mousemove', onMove)
        document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        })

        rafRef.current = requestAnimationFrame(animateRing)

        return () => {
        document.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <>
        <div ref={cursorRef} className="cursor" />
        <div ref={ringRef} className="cursor-ring" />
        </>
    )
    }