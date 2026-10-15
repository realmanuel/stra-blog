import Link from 'next/link'
import { CATEGORY_META, CATEGORY_SLUGS } from '@/lib/posts'

const links = CATEGORY_SLUGS
  .filter((slug) => slug !== 'uncategorised')
  .map((slug) => ({
    label: CATEGORY_META[slug]?.label ?? slug,
    href: `/?category=${slug}`,
  }))

const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/Reallnxgga',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/thereal_.manny/',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/immanuel-faniyi',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Gmail',
    href: 'mailto:immanuelfaniyi11@gmail.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
]

export default function BlogFooter() {
  return (
    <footer className="w-full border-t border-cream/10 bg-[#0A0A0B] px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 py-14 md:grid-cols-[1fr_auto] md:items-start md:gap-16 md:py-20">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="Tech Notes home"
              className="inline-flex items-center gap-3 text-cream transition-colors hover:text-accent"
            >
              <span
                className="text-3xl font-extrabold tracking-[-0.06em] sm:text-4xl"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                TECH
              </span>
              <span className="h-7 w-px bg-cream/20" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
                Notes
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-cream/50">
              A personal journal on software, data, and the ideas shaping our digital world.
            </p>
            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:outline-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer categories" className="md:min-w-80">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/35">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-accent"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-accent/50 transition-transform group-hover:scale-150"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-mono text-[10px] tracking-wide text-cream/35">
            © {new Date().getFullYear()} Immanuel Faniyi
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/25">
            Made for the curious
          </p>
        </div>
      </div>
    </footer>
  )
}