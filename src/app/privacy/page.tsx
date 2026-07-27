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
        heading: 'Who We Are',
        content: (
        <p>Stra is a digital marketplace facilitation platform that enables users to buy and sell approved products, including pre-loved items and approved new products, through a structured system that may include listing review, AI verification, payment processing, escrow or controlled settlement flows, logistics coordination, fraud checks, and dispute handling.<br /> For the purpose of this Privacy Policy, &quot;Stra,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot; refers to the Stra platform and its operators, affiliates, service providers, and authorized partners involved in delivering the Platform.</p>
        ),
    },
    {
        heading: 'Scope of This Privacy Policy',
        content: (
        <>
            <p>This Privacy Policy applies to personal information collected when you:</p>
            <p>— visit Stra&apos;s website or mobile app;</p>
            <p>— create an account;</p>
            <p>— buy an item as a guest or registered user;</p>
            <p>— list or promote a product;</p>
            <p>— upload photos, videos, or verification content;</p>
            <p>— make or receive payments through the Platform;</p>
            <p>— interact with customer support or dispute resolution;</p>
            <p>— communicate with Stra through forms, emails, chat tools, or notifications; or</p>
            <p>— use any feature, service, campaign, or tool operated by Stra.</p>
            <p>This Privacy Policy applies whether you are a buyer, guest buyer, seller, prospective seller, promoter, referrer, or general visitor to the Platform.</p>
        </>
        ),
    },
    {
        heading: 'Information We Collect',
        content: (
        <>
            <p>Stra may collect personal information directly from you, automatically through your use of the Platform, and from third-party partners who help us operate the marketplace.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Account & profile information:</strong> full name, username or display name, phone number, email address, password and login credentials, profile image or business/store profile details, account preferences and settings.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Guest checkout information:</strong> If you choose to shop without creating an account, we may collect: your name, phone number, email address, delivery address, order details and purchase information, communications relating to the order.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Seller and listing information:</strong> If you list an item or use seller features, we may collect: store name or seller profile information, product titles, descriptions, prices, category selections, and item condition details, product images, live verification videos or other listing verification content, details about item ownership, condition, authenticity, defects, or usage history, payout or settlement information where required for seller onboarding or disbursement.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Payment and transaction information:</strong> We may collect or receive information related to payments and transactions, such as: billing information, payment status, transaction references, order value, fees, refunds, reversals, or settlement records, wallet, bank, or payout details where applicable. Stra may not store full card details where payment processing is handled by licensed third-party payment processors.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Communications & support information:</strong> When you contact Stra, submit a complaint, request support, raise a dispute, or respond to a review process, we may collect: messages, emails, chat content, support tickets, and complaint records, dispute statements and supporting explanations, photos, screenshots, videos, receipts, courier evidence, or any materials submitted during a review or dispute, call records or notes where customer support interactions are documented.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Information collected automatically:</strong> When you access or use Stra, we may automatically collect certain technical and usage information, including: IP address, browser type and device type, operating system, app version, device identifiers, pages viewed, clicks, searches, and navigation behavior, time spent on pages or features, referral links and source channels, log data, timestamps, crash data, and performance diagnostics, approximate location information derived from IP or device settings where permitted.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Information from third parties:</strong> Stra may receive information from third parties such as: payment processors and financial partners, logistics and courier partners, identity verification, fraud prevention, and security service providers, analytics, hosting, cloud, and infrastructure providers, marketing or attribution providers, customer support and communication tool providers, social login or referral sources where integrated.</p>
        </>
        ),
    },
    {
        heading: 'Why We Collect and Use Your Information',
        content: (
        <>
            <p>Stra uses personal information to operate, secure, improve, and enforce the Platform. Depending on the context, we may use your information for the following purposes:</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To provide the Platform and fulfill transactions:</strong> We use data to:
                create and manage user accounts; process guest checkouts and purchases; publish, manage, review, or remove listings; coordinate delivery, returns, refunds, and order fulfillment; process payments, settlements, escrow flows, and payouts; send order confirmations, shipping updates, and system notifications.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To verify listings, prevent fraud, and maintain marketplace safety:</strong> Stra uses information to: verify products, sellers, buyers, and transactions; review product photos, listing descriptions, and live verification videos; detect suspicious behavior, fake listings, counterfeit items, chargeback abuse, refund abuse, or off-platform scam attempts; conduct AI-assisted and human moderation checks; investigate complaints, claims, and policy violations; enforce marketplace rules and make dispute decisions.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To communicate with you:</strong> We may use your information to: send service emails, OTPs, account alerts, receipts, order updates, and support responses; notify you about disputes, verification requests, policy issues, or transaction actions; respond to customer service inquiries and complaints; provide product, order, logistics, or account support.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To improve Stra and personalize the experience:</strong> We may use information to: analyze user behavior, traffic, engagement, and feature performance; improve product discovery, search relevance, listing quality, and marketplace design; troubleshoot bugs, crashes, and operational issues; understand platform demand, fraud patterns, and seller performance trends.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To support promotions and visibility tools:</strong> If you use paid promotional tools, listing boosts, store links, or referral-based features, Stra may use relevant information to: activate or manage promotional placement; measure visibility, clicks, performance, or engagement; attribute referral traffic or product discovery; enforce eligibility and promotion rules.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>To comply with legal, regulatory, and business obligations:</strong> We may process personal information where necessary to: comply with applicable laws, regulations, court orders, or lawful requests; prevent abuse, fraud, money laundering, theft, or security incidents; maintain accounting, tax, audit, and internal business records; protect Stra, users, staff, partners, and the public from harm.</p>
        </>
        ),
    },
    {
        heading: 'AI Review, Fraud Monitoring & Moderation',
        content: (
        <>
            <p>Stra may use automated tools, AI systems, machine-assisted review, and human moderation to assess listings, transactions, and account activity. This may include review of listing text and metadata; product photos and uploaded videos; suspicious pricing or transaction behavior; account activity patterns and abuse indicators; dispute evidence and order history.</p>
            <p>These tools help us detect fraud, misrepresentation, counterfeit items, unsafe content, policy violations, delivery abuse, and platform circumvention. Stra may use the outcomes of such reviews to approve, reject, delay, restrict, investigate, suspend, or remove listings, accounts, transactions, payouts, or promotions.</p>
        </>
        ),
    },
    {
        heading: 'Guest Checkout & Limited-Account Purchases',
        content: (
        <p>Stra allows eligible buyers to complete purchases without opening a full password-protected account. Where a user shops as a guest, Stra may still collect the information needed to process the order, communicate updates, coordinate delivery, manage payment, resolve disputes, and prevent fraud. Guest checkout data may also be linked to a transaction history, fraud review process, refund request, or customer support record where necessary to protect the Platform and complete the order.</p>
        ),
    },
    {
        heading: 'How We Share Personal Information',
        content: (
        <>
            <p>Stra does not sell your personal information as a standalone product. However, we may share information where necessary to operate the marketplace, complete a transaction, comply with law, or protect users and the Platform.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Payment, escrow, and financial service partners:</strong> We may share relevant information with payment processors, settlement providers, escrow partners, wallet providers, banking partners, or fraud-prevention financial infrastructure providers to process payments and refunds, verify payment activity, hold or release funds, complete seller payouts, and investigate payment-related fraud or disputes.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Logistics and courier partners:</strong> We may share order and delivery information with logistics providers, riders, dispatch operators, warehousing or fulfillment partners to enable pickup, delivery, return handling, proof of delivery, and logistics support.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Verification, fraud, security, and compliance partners:</strong> We may share information with service providers that help us with identity and risk review, listing verification, fraud monitoring, cybersecurity and platform protection, moderation, abuse detection, and compliance review.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Technology, hosting, and support providers:</strong> We may share information with vendors that provide cloud hosting, analytics, data storage, customer support software, communication infrastructure, product performance tools, engineering support, and business operations support.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Professional advisers and legal recipients:</strong> We may disclose information to lawyers, auditors, insurers, consultants, regulators, courts, law enforcement, or government authorities where required by law or reasonably necessary to protect Stra, our users, or the public.</p>
            <p><strong style={{ color: '#F2F0EB', fontWeight: 500 }}>Corporate or business transaction recipients:</strong> If Stra is involved in a merger, acquisition, restructuring, financing, sale of assets, or similar corporate transaction, user information may be transferred or reviewed as part of that process, subject to appropriate confidentiality and legal safeguards.</p>
        </>
        ),
    },
    {
        heading: 'Contact Data Walls & Marketplace Privacy Controls',
        content: (
        <>
            <p>Stra may restrict or mask certain personal information between users in order to reduce fraud, harassment, off-platform scams, and transaction circumvention.</p>
            <p>This means: a buyer and seller may not always see each other&apos;s full personal contact information; Stra may use platform-based notifications, internal order messaging, masked communication flows, or operational routing to coordinate the transaction; payment records and sensitive financial details may be shielded from counterparties where appropriate; Stra may limit the exposure of addresses, phone numbers, and other personal identifiers to only what is operationally necessary to complete delivery or resolve a dispute.</p>
        </>
        ),
    },
    {
        heading: 'Cookies, Tracking Technologies & Analytics',
        content: (
        <p>Stra may use cookies, pixels, SDKs, local storage, log files, and similar technologies to operate the Platform and understand user activity. These tools may help us keep you signed in; remember preferences or session settings; understand how users navigate the Platform; improve performance, product discovery, and fraud monitoring; measure the effectiveness of campaigns, promotions, and referral activity. Depending on your device, browser, or applicable law, you may be able to control certain cookies or tracking technologies through your settings. However, disabling some tools may affect how the Platform functions.</p>
        ),
    },
    {
        heading: 'Data Retention',
        content: (
        <p>Stra retains personal information for as long as reasonably necessary to provide the Platform and maintain user accounts; complete transactions and fulfill orders; process returns, refunds, disputes, and payouts; comply with tax, legal, accounting, security, and regulatory obligations; investigate fraud, abuse, or policy violations; preserve records relevant to claims, audits, or internal business operations. Retention periods may vary depending on the type of information, the nature of the transaction, operational risk, legal requirements, and whether the account or order has been flagged for review.</p>
        ),
    },
    {
        heading: 'Data Security',
        content: (
        <>
            <p>Stra takes reasonable administrative, technical, and organizational measures designed to protect personal information from unauthorized access, misuse, loss, alteration, or disclosure.</p>
            <p>These measures may include access controls and internal permission restrictions; encrypted transmission where appropriate; secure hosting and infrastructure practices; fraud monitoring systems and suspicious activity detection; staff access limitations and review procedures; third-party payment handling through licensed processors where applicable.</p>
            <p>However, no platform, transmission method, or storage system can be guaranteed to be completely secure. You are responsible for keeping your account credentials, verification codes, and devices secure.</p>
        </>
        ),
    },
    {
        heading: 'Your Rights & Choices',
        content: (
        <>
            <p>Depending on your location and applicable law, you may have rights regarding your personal information. These may include the right to request access to certain personal data we hold about you; request correction of inaccurate or incomplete data; request deletion of data in certain circumstances; object to or request restriction of certain processing; withdraw consent where processing is based on consent; request help with account closure or privacy-related complaints.</p>
            <p>Stra may ask for verification before responding to certain privacy requests, and some requests may be limited where retention is required for fraud prevention, dispute handling, legal compliance, payment reconciliation, or platform security.</p>
            <p>To exercise a privacy request, contact Stra using the contact details listed below.</p>
        </>
        ),
    },
    {
        heading: "Children's Privacy",
        content: (
        <p>Stra is not intended for children under the age of 18 in relation to selling features, account creation for marketplace participation, or other restricted platform activities. We do not knowingly collect personal information from children in a manner that is prohibited by applicable law. If we become aware that prohibited child data has been submitted to the Platform, we may delete it or take steps to restrict the account or transaction.</p>
        ),
    },
    {
        heading: 'Changes to This Privacy Policy',
        content: (
        <p>Stra may update this Privacy Policy from time to time to reflect changes in the Platform, legal requirements, security practices, payment flows, logistics operations, promotional tools, verification processes, or marketplace structure. Where we make material changes, we may update the &quot;Last Updated&quot; date, publish the revised policy on the Platform, or provide additional notice where appropriate. Your continued use of Stra after an update may constitute acceptance of the revised Privacy Policy to the extent permitted by law.</p>
        ),
    },
    {
        heading: 'Contact Stra',
        content: (
        <>
            <p>If you have questions, complaints, or requests relating to this Privacy Policy or Stra&apos;s handling of personal information, please contact us at:</p>
            <div
            className="mt-2 p-6"
            style={{ border: '1px solid rgba(242,240,235,0.08)', background: 'rgba(242,240,235,0.02)' }}
            >
            <p style={{ color: '#F2F0EB' }}>Stra Privacy Team</p>
            <p>Support Email:{' '}
                <a
                    href="mailto:privacy@strawise.co"
                    className="no-underline"
                    style={{ color: '#C8FF00' }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                privacy@strawise.co
                </a>
            </p>
            <p className="mt-2">Business Address: Plot 104 Emmanuel Adiele Street, off Mike Akhigbe Way, Jabi, Abuja</p>
            </div>
        </>
        ),
    },
    {
        heading: 'Important Privacy Notice',
        content: (
        <p>Stra is a structured marketplace platform that uses verification systems, operational data controls, fraud monitoring, and payment/logistics integrations to support safer transactions. By using Stra, you acknowledge that certain personal information may be processed as necessary to operate the marketplace, enforce platform rules, prevent fraud, coordinate delivery, manage disputes, and complete transactions in accordance with this Privacy Policy.</p>
        ),
    },
    ]

    export default function PrivacyPage() {
    useScrollReveal()

    return (
        <>
        <CustomCursor />
        <Navbar />
        <main>
            <LegalHero
            tag="Legal"
            title="Stra Privacy"
            italic="Policy"
            description={"Welcome to Stra. This Privacy Policy explains how Stra collects, uses, stores, shares, and protects your personal information when you access or use our marketplace platform, website, mobile applications, seller tools, guest checkout services, promotional tools, customer support channels, and related services (collectively, the “Platform”).\n\nStra is committed to building a marketplace that is secure, trustworthy, fraud-resistant, and respectful of user privacy. By using Stra, creating an account, listing an item, shopping as a guest, communicating with Stra, or otherwise interacting with the Platform, you acknowledge that your personal data may be collected and processed as described in this Privacy Policy."} 
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
                    href="/terms"
                    className="text-[11px] no-underline transition-colors duration-200 leading-[1.6]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(242,240,235,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,235,0.4)')}
                >
                    Terms of Use →
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
        </main>
        <Footer />
        </>
    )
    }