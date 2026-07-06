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
        <footer className="border-t border-[#F2F0EB]/[0.08]">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 md:px-12 md:py-16 border-b border-[#F2F0EB]/[0.08]">
            
            {/* Brand */}
            <div>
            <div className="mb-4 flex items-center gap-3">
                <span className="font-[family-name:var(--font-syne)] text-[20px] font-extrabold tracking-[-0.02em] text-white">
                STR<span className="text-[#C8FF00]">A</span>
                </span>
                <span className="block h-4 w-px bg-[#F2F0EB]/15" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2F0EB]/40">
                Journal
                </span>
            </div>
            <p className="mb-5 font-mono text-[11px] leading-[1.8] text-[#F2F0EB]/35">
                The official Stra publication. Platform updates, product spotlights, seller features and marketplace insights.
            </p>
            <span className="inline-block border border-[#F2F0EB]/[0.08] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2F0EB]/25">
                Vol. 01 — 2026
            </span>
            </div>

            {/* Category links */}
            <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F0EB]/30">
                Categories
            </div>
            <ul className="flex list-none flex-col gap-3">
                {footerLinks.map((link) => (
                <li key={link.href}>
                    <Link
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#F2F0EB]/40 no-underline transition-colors duration-200 hover:text-[#C8FF00]"
                    >
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>
            </div>

            {/* Main site links */}
            <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F0EB]/30">
                Stra Platform
            </div>
            <ul className="flex list-none flex-col gap-3">
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
                    className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F2F0EB]/40 no-underline transition-colors duration-200 hover:text-[#C8FF00]"
                    >
                    {link.label}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0 opacity-50">
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </a>
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-4 px-6 py-6 text-center md:flex-row md:justify-between md:px-12 md:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F2F0EB]/20">
            © 2026 Stra. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
            <a
                href="https://www.gestra.ng/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F2F0EB]/20 no-underline transition-colors duration-200 hover:text-[#F2F0EB]/50"
            >
                Terms
            </a>
            <a
                href="https://www.gestra.ng/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F2F0EB]/20 no-underline transition-colors duration-200 hover:text-[#F2F0EB]/50"
            >
                Privacy
            </a>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F2F0EB]/15">
            A Stra Publication
            </p>
        </div>
        </footer>
    )
    }