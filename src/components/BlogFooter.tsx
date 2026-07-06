    import Link from 'next/link'

    const footerLinks = [
    { label: 'Updates', href: '/?cat=update' },
    { label: 'Product Spotlights', href: '/?cat=spotlight' },
    { label: 'Seller Stories', href: '/?cat=seller-story' },
    { label: 'Platform Tips', href: '/?cat=tips' },
    { label: 'Industry', href: '/?cat=industry' },
    ]

    export default function BlogFooter() {
    return (
        <footer style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}>

        {/* Top row */}
        <div
            className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10"
            style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
            {/* Brand */}
            <div>
            <div className="flex items-center gap-3 mb-4">
                <span
                className="text-[20px] font-extrabold"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
                >
                STR<span style={{ color: '#C8FF00' }}>A</span>
                </span>
                <span style={{ width: '1px', height: '16px', background: 'rgba(242,240,235,0.15)', display: 'block' }} />
                <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                >
                Journal
                </span>
            </div>
            <p
                className="text-[11px] leading-[1.8] mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
            >
                The official Stra publication. Platform updates, product spotlights, seller features and marketplace insights.
            </p>
            <span
                className="text-[10px] uppercase tracking-[0.12em] px-3 py-2 inline-block"
                style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(242,240,235,0.25)',
                border: '1px solid rgba(242,240,235,0.08)',
                }}
            >
                Vol. 01 — 2026
            </span>
            </div>

            {/* Category links */}
            <div>
            <div
                className="text-[10px] uppercase tracking-[0.2em] mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
                Categories
            </div>
            <ul className="flex flex-col gap-3 list-none">
                {footerLinks.map((link) => (
                <li key={link.href}>
                    <Link
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.08em] no-underline transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
                    >
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>
            </div>

            {/* Main site links */}
            <div>
            <div
                className="text-[10px] uppercase tracking-[0.2em] mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
                Stra Platform
            </div>
            <ul className="flex flex-col gap-3 list-none">
                {[
                { label: 'Visit gestra.ng', href: 'https://www.gestra.ng' },
                { label: 'How It Works', href: 'https://www.gestra.ng/how-it-works' },
                { label: 'Start Selling', href: 'https://www.gestra.ng/selling' },
                { label: 'Browse Products', href: 'https://www.gestra.ng/buying' },
                { label: 'Trust & Safety', href: 'https://www.gestra.ng/trust' },
                ].map((link) => (
                <li key={link.href}>
                    <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] no-underline transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
                    >
                    {link.label}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Bottom row */}
        <div
            className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left"
        >
            <p
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.2)' }}
            >
            © 2026 Stra. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
            <a
                href="https://www.gestra.ng/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.08em] no-underline transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.2)')}
            >
                Terms
            </a>
            <a
                href="https://www.gestra.ng/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.08em] no-underline transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.2)')}
            >
                Privacy
            </a>
            </div>
            <p
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.15)' }}
            >
            A Stra Publication
            </p>
        </div>
        </footer>
    )
    }