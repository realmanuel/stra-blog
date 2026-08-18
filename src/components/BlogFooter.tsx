import Link from 'next/link'

const links = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Trust & Safety', href: '/trust' },
  { label: 'TERMS', href: '/terms' },
]

export default function BlogFooter() {
  return (
    <footer
      className="px-6 md:px-12 pt-16 pb-8 flex flex-col gap-10 md:gap-16"
      style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}
    >
      {/* Top Section: Logo & Main Links */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Logo */}
        <div
          className="text-4xl md:text-5xl font-extrabold"
          style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#F2F0EB' }}
        >
          AR<span style={{ color: '#C8FF00' }}>K</span>
        </div>

        {/* Main Links */}
        <ul className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 list-none p-0 m-0">
          {links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                // CHANGED: Removed JS mouse events and added text-[#F2F0EB]/40 and hover:text-[#C8FF00]
                className="text-[11px] uppercase tracking-[0.1em] no-underline transition-colors duration-200 text-[#F2F0EB]/40 hover:text-[#C8FF00]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Copyright & Terms */}
      <div 
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8"
        style={{ borderTop: '1px solid rgba(242,240,235,0.04)' }}
      >
        {/* Copyright */}
        <div
          className="text-[11px] tracking-[0.05em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.25)' }}
        >
          © {new Date().getFullYear()} Ark. All rights reserved.
        </div>

        {/* Legal Links */}
        {/* <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
          {terms.map((term) => (
            <li key={term.label}>
              <Link
                href={term.href}
                // CHANGED: Removed JS mouse events and added text-[#F2F0EB]/25 and hover:text-[#F2F0EB]/60
                className="text-[11px] tracking-[0.05em] transition-colors duration-200 no-underline text-[#F2F0EB]/25 hover:text-[#F2F0EB]/60"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {term.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </footer>
  )
}