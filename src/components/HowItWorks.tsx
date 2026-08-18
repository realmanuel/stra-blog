    const steps = [
    {
        num: '01 — SELLER',
        icon: '📸',
        title: 'List with Video + Photos',
        body: (
        <>
            Upload clear photos visible to buyers and a video our team reviews internally to verify
            condition.{' '}
            <strong style={{ color: '#C8FF00', fontWeight: 400 }}>
            No misrepresentation passes our gate.
            </strong>{' '}
            Subscribe to push your listing to thousands of buyers.
        </>
        ),
    },
    {
        num: '02 — BUYER',
        icon: '🛍️',
        title: 'Browse, Pay, Relax',
        body: (
        <>
            See listings at seller price plus our{' '}
            <strong style={{ color: '#C8FF00', fontWeight: 400 }}>5% service fee</strong>. Pay
            securely through the platform. Your money is held safely until your item arrives exactly as
            shown.
        </>
        ),
    },
    {
        num: '03 — DELIVERY',
        icon: '🚀',
        title: 'Rider Delivers, Seller Gets Paid',
        body: (
        <>
            Our rider picks up from seller and delivers to buyer.{' '}
            <strong style={{ color: '#C8FF00', fontWeight: 400 }}>
            Once rider confirms handoff
            </strong>
            , seller receives payment within 24 hours. No waiting for buyer confirmation.
        </>
        ),
    },
    ]

    export default function HowItWorks() {
    return (
        <section id="how" className="px-6 md:px-12 py-24 md:py-40 mb-16 relative">
        {/* Section tag */}
        <div
            className="text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
        >
            {/* <span className="w-6 h-[0.5px] bg-[#C8FF00] block" /> */}
            <span style={{ width: '24px', height: '1px', background: '#C8FF00', display: 'block', flexShrink: 0 }} />
            Process
        </div>

        <h2
            className="reveal font-extrabold mb-16 md:mb-20 max-w-[600px]"
            style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(40px, 5vw, 72px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            }}
        >
            How{' '}
            <em
            style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(242,240,235,0.4)',
            }}
            >
            Ark
            </em>{' '}
            works for everyone
        </h2>

        <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{
            gap: '1px',
            background: 'rgba(242,240,235,0.08)',
            border: '1px solid rgba(242,240,235,0.08)',
            }}
        >
            {steps.map((step) => (
            <div
                key={step.num}
                className="reveal group px-10 py-14 transition-colors duration-300"
                style={{ background: '#030305' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1A1A22')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#030305')}
            >
                <div
                className="text-[11px] uppercase tracking-[0.2em] mb-8"
                style={{ fontFamily: 'var(--font-mono)', color: '#C8FF00' }}
                >
                {step.num}
                </div>
                <span className="text-4xl mb-6 block">{step.icon}</span>
                <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
                >
                {step.title}
                </h3>
                <p
                className="text-[13px] leading-[1.8]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.5)' }}
                >
                {step.body}
                </p>
            </div>
            ))}
        </div>
        </section>
    )
    }