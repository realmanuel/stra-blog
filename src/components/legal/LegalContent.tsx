    interface Section {
    heading: string
    content: React.ReactNode
    }

    interface LegalContentProps {
    sections: Section[]
    sideNote?: React.ReactNode
    }

    export default function LegalContent({ sections, sideNote }: LegalContentProps) {
    return (
        <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20 max-w-[1100px] mx-auto">

            {/* Sidebar — sticky TOC */}
            <aside className="hidden md:block">
            <div className="sticky top-32 flex flex-col gap-3">
                <div
                className="text-[10px] uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                Contents
                </div>
                {sections.map((s, i) => (
                    <a
                        key={i}
                        href={`#section-${i + 1}`}
                        className="text-[11px] leading-[1.6] no-underline transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.35)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.35)')}
                    >
                        {String(i + 1).padStart(2, '0')}. {s.heading}
                    </a>
                ))}
                {sideNote && (
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(242,240,235,0.08)' }}>
                    {sideNote}
                </div>
                )}
            </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col gap-16">
            {sections.map((s, i) => (
                <div
                key={i}
                id={`section-${i + 1}`}
                className="reveal scroll-mt-32"
                >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-6">
                    <span
                    className="text-[11px] flex-shrink-0"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                    >
                    {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(242,240,235,0.08)' }} />
                </div>

                <h2
                    className="text-[22px] md:text-[28px] font-bold mb-6"
                    style={{
                    fontFamily: 'var(--font-syne)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    }}
                >
                    {s.heading}
                </h2>

                <div
                    className="text-[13px] leading-[1.95] flex flex-col gap-5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.55)' }}
                >
                    {s.content}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
    }