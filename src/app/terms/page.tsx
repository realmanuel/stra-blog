    'use client'

    import Link from 'next/link'
    import CustomCursor from '@/components/BlogCursor'
    import Navbar from '@/components/BlogNavbar'
    import Footer from '@/components/BlogFooter'
    import LegalHero from '@/components/legal/LegalHero'
    import LegalContent from '@/components/legal/LegalContent'
    import { useScrollReveal } from '@/hooks/useScrollReveal'

    const sections = [
    {
        heading: 'Eligibility to Use Stra',
        content: (
        <>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Age requirement: </strong>You must be at least 18 years old to create an account, list an item, or use Stra's selling features.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Lawful use only: </strong>You may only use Stra for lawful transactions and for items you have the legal right to sell or purchase.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Guest checkout: </strong>Guest checkout: Buyers may choose to shop without creating an account by securely providing the information needed to process an order, including name, phone number, email address, and delivery details.</p>
        </>
        ),
    },
    {
        heading: 'What Can Be Sold on Stra',
        content: (
        <>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Stra allows the sale of: </strong></p>
            <p>Pre-loved / second-hand items that are legally owned by the seller; and new products approved by Stra for sale on the platform.</p>
            <p>Examples may include fashion, electronics, furniture, household items, accessories, and other permitted categories.</p>
            <p>Stra reserves the right to restrict, reject, suspend, or remove any listing, category, or product type at its discretion where necessary for compliance, quality control, safety, authenticity review, or fraud prevention.</p>
        </>
        ),
    },
    {
        heading: 'Seller Listing Requirements',
        content: (
        <>
            <p>To maintain marketplace integrity, every seller must ensure that each listing is truthful, complete, and accurate.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Ownership & authority to sell</strong></p>
            <p>You may only list an item if the item belongs to you or you are fully authorized to sell it; and its listing, sale, and delivery do not violate any law, regulation, third-party right, or Stra policy.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Mandatory live verification for eligible sellers/items</strong></p>
            <p>For certain listings — especially casual, peer-to-peer, or pre-loved item listings — Stra may require a 20–30 second live verification video of the physical item before the listing is approved or published.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Accurate item condition disclosure</strong></p>
            <p>Sellers must clearly and honestly disclose all relevant information about an item, including: condition and usage history; defects, wear, faults, repairs, replacements, or missing parts; any cosmetic or functional damage; any fact that could reasonably affect a buyer's decision to purchase.</p>
            <p>Failure to disclose known defects, damage, or material issues may result in listing removal, dispute liability, refund enforcement, payout reversal where possible, account restrictions, or suspension.</p>
        </>
        ),
    },
    {
        heading: 'AI Verification, Moderation & Listing Approval',
        content: (
        <>
            <p>Stra uses a combination of AI systems, automated risk controls, and human review to protect buyers, sellers, and the integrity of the marketplace.</p>
            <p>This may include review of product photos; verification videos; listing descriptions and metadata; pricing patterns, fraud indicators, and account activity; authenticity, mismatch, duplication, prohibited item, and damage signals.</p>
            <p>Stra may delay, reject, edit, hold for review, or remove any listing that appears inaccurate, suspicious, misleading, counterfeit, unsafe, prohibited, duplicated, or inconsistent with uploaded evidence.</p>
            <p>Submission of a listing does not guarantee approval or publication.</p>
        </>
        ),
    },
    {
        heading: 'Data Protection, Contact Restrictions & Off-Platform Safety',
        content: (
        <>
            <p>To reduce fraud, off-platform scams, and transaction manipulation, Stra operates a closed-loop marketplace system.</p>
            <p>Personal contact details, payment details, and sensitive transaction data may be restricted, masked, or hidden from counterparties where necessary.</p>
            <p>Users must not attempt to bypass Stra's systems in order to move transactions, payment, or delivery arrangements outside the platform.</p>
            <p>Stra may use platform notifications, masked communications, system-generated updates, and internal order routing to coordinate transactions securely.</p>
            <p>Any attempt to circumvent platform safeguards, solicit direct payment outside Stra, or misuse another user's personal data may result in cancellation, account restriction, or permanent suspension.</p>
        </>
        ),
    },
    {
        heading: 'Secure Escrow & Payment Protection',
        content: (
        <>
            <p>Stra uses a secure transaction structure to protect both parties.</p>
            <p>When an order is placed, the buyer's payment is processed through Stra's approved payment infrastructure and may be held in a secure escrow or controlled settlement flow until the transaction reaches the required completion stage.</p>
            <p>Sellers are not paid upfront before the order qualifies for release under Stra's transaction rules.</p>
            <p>Stra may rely on licensed payment processors, banking partners, settlement providers, or escrow partners to manage collection, holding, disbursement, and refund operations.</p>
            <p>Stra reserves the right to delay payout where a transaction is under review, flagged for risk, disputed, incomplete, returned, or reasonably suspected to involve fraud, policy abuse, or misrepresentation.</p>
        </>
        ),
    },
    {
        heading: 'Delivery, Inspection & Dispute Window',
        content: (
        <>
            <p>Stra coordinates delivery through platform-managed or platform-authorized logistics flows.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Delivery process:</strong> Once a seller confirms an item is ready, Stra may arrange courier pickup and delivery through an approved logistics process.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Buyer inspection window:</strong> Once an item is marked as delivered, the buyer has a 12-hour inspection and dispute window to report that the item is materially different from its description; the wrong item was delivered; the item arrived damaged; or there is another serious issue covered by Stra's dispute policy.</p>
            <p>If no qualifying dispute is raised within that inspection period, the order may proceed toward completion and payout release.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Escrow release timeline:</strong> The transaction may remain protected up to the 24-hour post-delivery mark, after which Stra may close the order and release eligible funds to the seller where no valid unresolved dispute exists.</p>
            <p>Once payout has been validly released and the order is completed under Stra's rules, the transaction may be treated as final, subject to applicable law and any specific exception Stra chooses to enforce.</p>
        </>
        ),
    },
    {
        heading: 'Returns, Rejections & Logistics Charges',
        content: (
        <>
            <p>Where a buyer validly disputes an item because it is materially misdescribed, materially damaged on arrival, or otherwise eligible for return under Stra's policies, Stra may authorize a return and process the outcome in line with its dispute decision.</p>
            <p>If a return is approved due to seller misdescription or a qualifying seller-side issue: the buyer may receive a refund of the eligible purchase amount; and Stra may deduct a 2.5% logistics/return handling fee from the transaction total to cover delivery and return movement costs where applicable under platform rules.</p>
            <p>Stra reserves the right to determine whether shipping, return handling, processing charges, or any non-refundable operational fee should be deducted depending on the facts of the transaction, courier costs, dispute outcome, and applicable policy.</p>
        </>
        ),
    },
    {
        heading: 'Promotions, Featured Listings & Store Sharing',
        content: (
        <>
            <p>Stra may offer optional paid promotional tools designed to help sellers increase visibility for their listings on the platform.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Per-product promotion:</strong> Promotional placement applies per individual product listing, not automatically to every item in a seller's store. A seller may choose to promote one product while keeping other listings as standard non-promoted listings.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Optional visibility plans:</strong> Stra may offer promotional subscription plans for eligible listings, including plans priced at ₦5,000 and ₦10,000 per product per month, or any updated pricing published by Stra from time to time.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Advertising-style placement:</strong> Promoted products may receive enhanced visibility across Stra, including featured placement, priority discovery surfaces, boosted category exposure, sponsored positions, or other ad-style promotional treatment within the marketplace.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>No guarantee of performance:</strong> Promotion increases visibility opportunities only. Stra does not guarantee impressions, clicks, inquiries, conversions, or sales from any promoted listing.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Promotion approval & eligibility:</strong> Stra reserves the right to determine which listings are eligible for promotion and may refuse, pause, remove, or limit promotional placement for any listing that violates policy, is misleading, is under dispute, is prohibited, or fails platform review standards.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Plan changes:</strong> Stra may update promotional pricing, visibility features, placement logic, duration, or eligibility rules at any time.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>External sharing:</strong> Users may share their store profile link or individual product listing link on social media bios, websites, messaging platforms, or other external channels, provided such sharing does not misrepresent Stra, mislead buyers, or violate any applicable platform rule.</p>
        </>
        ),
    },
    {
        heading: 'Prohibited Conduct',
        content: (
        <>
            <p>Users must not:</p>
            <p>— list stolen, counterfeit, illegal, unsafe, or prohibited goods;</p>
            <p>— upload false photos, manipulated videos, misleading descriptions, or fake proof of ownership;</p>
            <p>— attempt chargeback abuse, refund fraud, delivery manipulation, or escrow abuse;</p>
            <p>— harass, threaten, impersonate, or deceive other users, couriers, staff, or partners;</p>
            <p>— attempt to scrape, misuse, or extract personal data or internal platform information;</p>
            <p>— bypass Stra's transaction, payment, or dispute systems.</p>
            <p>Stra may investigate suspected misconduct and take any action it considers necessary, including warning, listing removal, refund hold, payout delay, account suspension, permanent ban, or referral to relevant authorities where appropriate.</p>
        </>
        ),
    },
    {
        heading: "Stra's Rights Over Listings, Accounts & Transactions",
        content: (
        <>
            <p>Stra reserves the right, at its sole discretion, to:</p>
            <p>— approve, reject, suspend, edit, limit, or remove listings;</p>
            <p>— request additional verification or supporting evidence;</p>
            <p>— pause or restrict accounts under review;</p>
            <p>— hold, delay, reverse, or refuse payouts where permitted;</p>
            <p>— cancel orders or prevent transactions that appear risky, fraudulent, unlawful, abusive, or operationally unsafe;</p>
            <p>— update marketplace rules, categories, fees, review standards, and platform workflows from time to time.</p>
        </>
        ),
    },
    {
        heading: 'Disputes & Platform Decisioning',
        content: (
        <>
            <p>By using Stra, you acknowledge that Stra may review transaction evidence — including listing content, delivery records, communication logs, verification submissions, and dispute statements — to determine the outcome of a dispute.</p>
            <p>Stra's decision may include refund approval, payout release, return authorization, fee allocation, listing penalties, or account action, depending on the circumstances and available evidence.</p>
        </>
        ),
    },
    {
        heading: 'Important Legal Notice',
        content: (
        <>
            <p>Stra is a marketplace facilitation platform that provides technology infrastructure, verification layers, transaction controls, promotional visibility tools, and logistics coordination to support safer commerce. Stra's AI checks, moderation systems, and escrow protections are designed to reduce risk, but they do not guarantee that every transaction will be entirely free from error, delay, misuse, or fraud.</p>
            <p>By using Stra, you agree to comply with Stra's platform rules, verification processes, escrow structure, dispute procedures, promotional policies, and enforcement decisions, subject to applicable law.</p>
        </>
        ),
    },
    ]

    export default function TermsPage() {
    useScrollReveal()

    return (
        <>
        <CustomCursor />
        <Navbar />
        <main>
            <LegalHero
            tag="Legal"
            title="Stra Platform Rules &"
            italic="Terms of Use"
            description="Welcome to Stra. By accessing the platform, creating an account, listing an item, or completing a purchase as a registered user or guest, you agree to these core platform rules. Stra is designed to deliver secure, structured, and fraud-resistant commerce through identity controls, listing verification, escrow protection, platform-managed logistics, and controlled marketplace visibility tools."
            lastUpdated="May 2026"
            />
            <LegalContent
            sections={sections}
            sideNote={
                <div className="flex flex-col gap-3">
                <p
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
                >
                    Also read
                </p>
                <Link
                    href="/privacy"
                    className="text-[11px] no-underline transition-colors duration-200 leading-[1.6]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
                >
                    Privacy Policy →
                </Link>
                <Link
                    href="/trust"
                    className="text-[11px] no-underline transition-colors duration-200 leading-[1.6]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
                >
                    Trust & Safety →
                </Link>
                </div>
            }
            />

            {/* Mobile-only also-read links */}
            <div className="md:hidden px-6 pb-16 flex flex-col gap-4">
            <p
                className="text-[10px] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.3)' }}
            >
                Also read
            </p>
            <Link
                href="/privacy"
                className="text-[13px] no-underline transition-colors duration-200"
                style={{
                fontFamily: 'var(--font-mono)',
                color: '#F2F0EB',
                border: '1px solid rgba(242,240,235,0.08)',
                padding: '14px 20px',
                display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C8FF00')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,240,235,0.08)')}
            >
                Privacy Policy →
            </Link>
            <Link
                href="/trust"
                className="text-[13px] no-underline transition-colors duration-200"
                style={{
                fontFamily: 'var(--font-mono)',
                color: '#F2F0EB',
                border: '1px solid rgba(242,240,235,0.08)',
                padding: '14px 20px',
                display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C8FF00')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,240,235,0.08)')}
            >
                Trust & Safety →
            </Link>
            </div>
        </main>
        <Footer />
        </>
    )
    }