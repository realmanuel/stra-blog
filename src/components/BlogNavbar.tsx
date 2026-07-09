    'use client'

    import { useState, useEffect, useCallback } from 'react'
    import Link from 'next/link'

    const NAV_LINKS = [
    { label: 'Updates', href: '/?category=update' },
    { label: 'Spotlights', href: '/?category=spotlight' },
    { label: 'Seller Stories', href: '/?category=seller-story' },
    { label: 'Platform Tips', href: '/?category=tips' },
    { label: 'Industry', href: '/?category=industry' },
    ]

    export default function BlogNavbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 48)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (menuOpen) {
        const sb = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        if (sb > 0) document.body.style.paddingRight = `${sb}px`
        } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        }
        return () => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        }
    }, [menuOpen])

    const close = useCallback(() => setMenuOpen(false), [])

    return (
        <>
        <nav
            role="navigation"
            aria-label="Main navigation"
            className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-[72px] transition-all duration-300"
            style={{
            borderBottom: `1px solid ${scrolled ? 'rgba(242,240,235,0.08)' : 'transparent'}`,
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            background: scrolled ? 'rgba(3,3,5,0.88)' : 'transparent',
            }}
        >
            {/* Wordmark */}
            <Link
            href="/"
            className="flex items-center gap-3 no-underline flex-shrink-0"
            aria-label="Stra Journal home"
            >
            <span
                className="text-[18px] font-extrabold"
                style={{ fontFamily: 'var(--font-syne)', color: '#F2F0EB', letterSpacing: '-0.02em' }}
            >
                STR<span style={{ color: '#C8FF00' }}>A</span>
            </span>
            <span
                style={{ width: '1px', height: '16px', background: 'rgba(242,240,235,0.2)', display: 'block', flexShrink: 0 }}
                aria-hidden="true"
            />
            <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
            >
                Journal
            </span>
            </Link>

            {/* Desktop centre links */}
            <ul
            className="hidden lg:flex gap-8 list-none absolute left-1/2 -translate-x-1/2"
            role="list"
            >
            {NAV_LINKS.map((link) => (
                <li key={link.href}>
                <Link
                    href={link.href}
                    className="text-[10px] uppercase tracking-[0.12em] no-underline transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.45)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F2F0EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.45)')}
                >
                    {link.label}
                </Link>
                </li>
            ))}
            </ul>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
            
                href="https://www.gestra.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] no-underline transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
            >
                gestra.ng
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            </div>

            {/* Mobile hamburger */}
            <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            className="lg:hidden flex flex-col gap-[5px] items-end p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            style={{ cursor: 'none', background: 'transparent', border: 'none' }}
            >
            <span
                className="block transition-all duration-300 ease-in-out"
                style={{
                width: '22px', height: '1.5px', background: '#F2F0EB',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                }}
                aria-hidden="true"
            />
            <span
                className="block transition-all duration-200 ease-in-out"
                style={{
                width: '14px', height: '1.5px', background: '#F2F0EB',
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? 'translateX(8px)' : 'none',
                }}
                aria-hidden="true"
            />
            <span
                className="block transition-all duration-300 ease-in-out"
                style={{
                width: '22px', height: '1.5px', background: '#F2F0EB',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                }}
                aria-hidden="true"
            />
            </button>
        </nav>

        {/* Backdrop */}
        <div
            className="fixed inset-0 z-[98] transition-all duration-500"
            style={{
            background: 'rgba(3,3,5,0.7)',
            backdropFilter: menuOpen ? 'blur(4px)' : 'blur(0px)',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            }}
            onClick={close}
            aria-hidden="true"
        />

        {/* Drawer */}
        <aside
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 bottom-0 z-[99] flex flex-col"
            style={{
            width: 'min(85vw, 340px)',
            background: '#030305',
            borderLeft: '1px solid rgba(242,240,235,0.08)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
            willChange: 'transform',
            visibility: menuOpen ? 'visible' : 'hidden',
            }}
        >
            {/* Drawer header */}
            <div
            className="flex items-center justify-between px-7 h-[72px] flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
            >
            <Link
                href="/"
                onClick={close}
                className="flex items-center gap-3 no-underline"
                aria-label="Stra Journal home"
            >
                <span
                className="text-[17px] font-extrabold"
                style={{ fontFamily: 'var(--font-syne)', color: '#F2F0EB', letterSpacing: '-0.02em' }}
                >
                STR<span style={{ color: '#C8FF00' }}>A</span>
                </span>
                <span
                style={{ width: '1px', height: '14px', background: 'rgba(242,240,235,0.2)', display: 'block' }}
                aria-hidden="true"
                />
                <span
                className="text-[10px] uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
                >
                Journal
                </span>
            </Link>

            <button
                aria-label="Close menu"
                onClick={close}
                className="p-2 -mr-2 transition-colors duration-200"
                style={{ cursor: 'none', background: 'transparent', border: 'none', color: 'rgba(242,240,235,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 overflow-y-auto px-7 py-6" aria-label="Mobile navigation">
            <div
                className="text-[10px] uppercase tracking-[0.2em] mb-6"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.25)' }}
            >
                Categories
            </div>
            <ul className="flex flex-col list-none p-0 m-0" role="list">
                {NAV_LINKS.map((link, i) => (
                <li
                    key={link.href}
                    style={{
                    borderBottom: '1px solid rgba(242,240,235,0.06)',
                    transition: `opacity 0.4s ease ${0.08 + i * 0.055}s, transform 0.4s ease ${0.08 + i * 0.055}s`,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(16px)',
                    }}
                >
                    <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between py-5 no-underline transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-syne)', color: 'rgba(242,240,235,0.55)', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F2F0EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.55)')}
                    >
                    {link.label}
                    <span style={{ color: '#C8FF00', fontSize: '12px' }} aria-hidden="true">→</span>
                    </Link>
                </li>
                ))}
            </ul>
            </nav>

            {/* Drawer footer */}
            <div
            className="px-7 py-6 flex flex-col gap-3 flex-shrink-0"
            style={{
                borderTop: '1px solid rgba(242,240,235,0.08)',
                transition: `opacity 0.4s ease 0.42s, transform 0.4s ease 0.42s`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            }}
            >
            
                href="https://www.gestra.ng"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2 w-full text-[11px] uppercase tracking-[0.12em] no-underline transition-all duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: '#030305', background: '#C8FF00', padding: '14px 20px' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#d4ff1a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#C8FF00')}
            >
                Visit gestra.ng
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <p
                className="text-center text-[10px] uppercase tracking-[0.1em] mt-1"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.2)' }}
            >
                © {new Date().getFullYear()} Stra Journal
            </p>
            </div>
        </aside>
        </>
    )
    }