    interface LegalHeroProps {
    tag: string
    title: string
    italic: string
    description: string
    lastUpdated?: string
    }

    export default function LegalHero({
    tag,
    title,
    italic,
    description,
    lastUpdated,
    }: LegalHeroProps) {
    return (
        <section className="px-6 md:px-12 pt-36 pb-16 md:pb-24 relative overflow-hidden">
        {/* BG glow */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `radial-gradient(ellipse 50% 60% at 80% 30%, rgba(200,255,0,0.04) 0%, transparent 70%)`,
            }}
        />

        {/* Grid */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
            backgroundImage: `
                linear-gradient(rgba(242,240,235,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(242,240,235,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            }}
        />

        {/* Tag */}
        <div
            className="animate-fadeUp-1 text-[11px] uppercase tracking-[0.2em] mb-8 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
        >
            <span style={{ width: '32px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }} />
            {tag}
        </div>

        {/* Headline */}
        <h1
            className="animate-fadeUp-2 font-extrabold leading-[0.92] mb-8"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(48px, 8vw, 112px)',
            letterSpacing: '-0.04em',
            }}
        >
            {title}{' '}
            <em
            style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(242,240,235,0.35)',
            }}
            >
            {italic}
            </em>
        </h1>

        <p
            className="animate-fadeUp-3 text-[13px] leading-[1.9] max-w-[520px] whitespace-pre-line"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.45)' }}
        >
            {description}
        </p>

        {lastUpdated && (
            <p
            className="animate-fadeUp-4 mt-6 text-[11px] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.25)' }}
            >
            Last updated — {lastUpdated}
            </p>
        )}

        {/* Divider */}
        <div
            className="mt-14"
            style={{ height: '1px', background: 'rgba(242,240,235,0.08)' }}
        />
        </section>
    )
    }