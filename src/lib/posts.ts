    export type Category =
    | 'update'
    | 'spotlight'
    | 'seller-story'
    | 'tips'
    | 'industry'

    export interface Author {
    name: string
    role: string
    avatar: string // emoji for now, becomes Sanity image URL later
    }

    export interface Post {
    slug: string
    title: string
    excerpt: string
    category: Category
    date: string
    readTime: string
    author: Author
    coverEmoji: string // placeholder until real images from Sanity
    featured?: boolean
    body?: Block[]
    }

    export interface Block {
    type: 'paragraph' | 'heading' | 'quote' | 'image'
    text?: string
    level?: number
    }

    export const CATEGORY_LABELS: Record<Category, string> = {
    'update': 'Platform Update',
    'spotlight': 'Product Spotlight',
    'seller-story': 'Seller Story',
    'tips': 'Platform Tips',
    'industry': 'Industry',
    }

    export const CATEGORY_STYLES: Record<Category, { color: string; border: string; bg: string }> = {
    'update':       { color: '#C8FF00',  border: 'rgba(200,255,0,0.3)',   bg: 'rgba(200,255,0,0.05)'   },
    'spotlight':    { color: '#C8A0FF',  border: 'rgba(200,160,255,0.3)', bg: 'rgba(200,160,255,0.05)' },
    'seller-story': { color: '#FF8C42',  border: 'rgba(255,140,66,0.3)',  bg: 'rgba(255,140,66,0.05)'  },
    'tips':         { color: '#42D4FF',  border: 'rgba(66,212,255,0.3)',  bg: 'rgba(66,212,255,0.05)'  },
    'industry':     { color: 'rgba(242,240,235,0.5)', border: 'rgba(242,240,235,0.08)', bg: 'transparent' },
    }

    export const POSTS: Post[] = [
    {
        slug: 'stra-is-live',
        title: "Stra is live — here's everything you need to know about how the marketplace works",
        excerpt: "After months of building, testing, and refining, Stra is now open. We're starting with a focused set of categories and a clear commitment: every listing you see on Stra has been reviewed before it reaches you.",
        category: 'update',
        date: 'June 12, 2026',
        readTime: '5 min read',
        author: { name: 'Stra Team', role: 'Official', avatar: '🏢' },
        coverEmoji: '🏪',
        featured: true,
        body: [
        { type: 'paragraph', text: "After months of building, testing, and refining, Stra is now officially open. We're starting with a focused set of categories — fashion, electronics, furniture, appliances, gadgets, and more — and a clear commitment: every listing you see on Stra has been reviewed before it reaches you." },
        { type: 'heading', text: 'What we built and why', level: 2 },
        { type: 'paragraph', text: "We built Stra because we believe the secondhand market in Nigeria deserves better infrastructure. Too many transactions happen on trust alone — a phone call, a screenshot, a prayer. That's not good enough for buyers or sellers." },
        { type: 'quote', text: "Every listing on Stra is reviewed before it goes live. That's not a feature — it's the foundation." },
        { type: 'heading', text: 'How verification works', level: 2 },
        { type: 'paragraph', text: "For eligible listings, sellers record a short 20–30 second video of the item. Our team reviews it against the listing description and photos. If it matches, the listing goes live. If it doesn't, it comes back for correction. This one step removes a significant amount of the uncertainty that makes peer-to-peer marketplaces frustrating." },
        { type: 'paragraph', text: "Payments are held in escrow until delivery is confirmed. Sellers are paid within 24 hours of handoff. Buyers have a 12-hour inspection window. Everything is coordinated through the platform — no direct contact required between parties." },
        { type: 'heading', text: "What's coming next", level: 2 },
        { type: 'paragraph', text: "We're rolling out category by category, improving our verification turnaround time, and building the tools sellers need to grow on the platform. This is version one. We're already working on what comes after it." },
        ],
    },
    {
        slug: 'iphone-13-verification',
        title: 'This iPhone 13 listing is why video verification changes everything',
        excerpt: "We walk through a real approved listing — what the seller submitted, what our team reviewed, and why it passed. A look at verification in practice.",
        category: 'spotlight',
        date: 'June 8, 2026',
        readTime: '4 min read',
        author: { name: 'Stra Team', role: 'Editorial', avatar: '📝' },
        coverEmoji: '📱',
        body: [
        { type: 'paragraph', text: "When this iPhone 13 listing came through, it ticked every box. Clear photos from multiple angles, an honest description that mentioned a minor scuff on the back corner, and a verification video that showed the phone powering on, running through its settings, and demonstrating that Face ID worked." },
        { type: 'heading', text: 'What our review team saw', level: 2 },
        { type: 'paragraph', text: "The listing described the phone as 'excellent condition with minor cosmetic wear.' The video confirmed exactly that. The scuff mentioned in the description was visible in the video. Nothing was hidden, nothing was exaggerated. It was approved within two hours." },
        { type: 'quote', text: "Honest listings get approved faster. That's not a coincidence — it's how the system is designed." },
        { type: 'paragraph', text: "This is what verification looks like when it works. The seller gets a live listing quickly. The buyer sees a product that's been reviewed. Trust exists before the transaction even starts." },
        ],
    },
    {
        slug: 'amaka-wardrobe',
        title: 'Amaka cleared her wardrobe and made ₦180,000 in 3 weeks',
        excerpt: "She'd been meaning to sell her clothes for two years. A friend mentioned Stra. Here's how her first three weeks on the platform went — from listing to payout.",
        category: 'seller-story',
        date: 'June 5, 2026',
        readTime: '6 min read',
        author: { name: 'Stra Journal', role: 'Editorial', avatar: '✍️' },
        coverEmoji: '👗',
        body: [
        { type: 'paragraph', text: "Amaka had been staring at the same rail of clothes for two years. Barely worn pieces from a season of Lagos parties, a few brand buys that never quite fit right, and a corner of the wardrobe she'd quietly given up on. 'I always said I'd sell them,' she told us. 'But every time I thought about it, the whole thing felt like too much work.'" },
        { type: 'heading', text: 'Her first listing took 12 minutes', level: 2 },
        { type: 'paragraph', text: "When a friend told her about Stra, Amaka's first question was simple: 'Do I have to talk to the buyers directly?' The answer — no — was enough for her to download the app that evening. Her first listing was a barely worn Zara blazer. She took photos in natural light, set her price, recorded a short verification video, and submitted. The listing was approved the next morning. It sold within 36 hours." },
        { type: 'quote', text: "I didn't have to chase anyone, meet anywhere, or explain myself. The rider came, collected the blazer, and I got my money the next day. That was it." },
        { type: 'heading', text: 'Three weeks, 22 items, ₦180,000', level: 2 },
        { type: 'paragraph', text: "By the end of week three, Amaka had listed and sold 22 items — mostly fashion, a few accessories, one pair of barely-used trainers she'd bought in London and never worn in Lagos heat. Total earnings: ₦180,000 after Stra's commission. No disputes, no difficult buyers, no logistics headaches." },
        { type: 'paragraph', text: "What surprised her most wasn't the money. It was how little friction was involved. 'I thought it was going to feel like a job,' she said. 'It just felt like clearing my wardrobe and getting paid for it.'" },
        ],
    },
    {
        slug: 'listings-approved-faster',
        title: '5 things that get listings approved faster on Stra',
        excerpt: "Lighting, angles, honest descriptions, and one often-missed detail about verification videos. What our review team actually looks for when a listing comes in.",
        category: 'tips',
        date: 'June 2, 2026',
        readTime: '3 min read',
        author: { name: 'Stra Team', role: 'Official', avatar: '🏢' },
        coverEmoji: '💡',
        body: [
        { type: 'paragraph', text: "Our review team sees hundreds of listings. Some sail through in under two hours. Others go back and forth multiple times before they're approved. The difference almost always comes down to the same five things." },
        { type: 'heading', text: '1. Natural light on every photo', level: 2 },
        { type: 'paragraph', text: "Dim or artificial light hides condition. Natural light shows it honestly — which is exactly what verification is designed to confirm. Step outside or stand near a window." },
        { type: 'heading', text: '2. Show the actual condition in the video', level: 2 },
        { type: 'paragraph', text: "The verification video should show what the listing describes. If the description mentions a crack, the video should show it. If the description says mint condition, the video should confirm that. Mismatches are the single biggest reason listings are sent back." },
        { type: 'quote', text: "The fastest approved listings are the ones where the video matches the description word for word." },
        { type: 'heading', text: '3. Mention defects before we find them', level: 2 },
        { type: 'paragraph', text: "Disclose everything upfront. Sellers who honestly describe wear, faults, or missing parts get approved faster — because there's nothing to question." },
        ],
    },
    {
        slug: 'escrow-explained',
        title: "How escrow actually works on Stra — a plain-language breakdown",
        excerpt: "'Where does the money go when I pay?' It's the most common question we get from first-time buyers. This is the full answer.",
        category: 'update',
        date: 'May 28, 2026',
        readTime: '5 min read',
        author: { name: 'Stra Team', role: 'Official', avatar: '🏢' },
        coverEmoji: '🔒',
        body: [
        { type: 'paragraph', text: "When you pay for an item on Stra, the money doesn't go straight to the seller. It enters a protected settlement flow — held securely until the transaction reaches the required completion stage. This is escrow, and it's the core of how Stra protects both sides of every transaction." },
        { type: 'heading', text: 'The full flow, step by step', level: 2 },
        { type: 'paragraph', text: "Buyer pays → funds enter escrow → seller is notified → seller confirms item is ready → rider collects → rider delivers → buyer has 12 hours to raise a dispute → no valid dispute raised → seller receives payout within 24 hours." },
        { type: 'quote', text: "Your money is never at risk. It moves only when the transaction is complete." },
        { type: 'paragraph', text: "If a valid dispute is raised — item doesn't match, wrong item delivered, item damaged — the rider collects it back and the buyer receives a full refund. The seller only receives payment when everything is confirmed." },
        ],
    },
    {
        slug: 'nigeria-secondhand-market',
        title: "Why Nigeria's secondhand market is at a tipping point",
        excerpt: "The structural shift in how Nigerians shop — and what it means for platforms built around trust.",
        category: 'industry',
        date: 'May 14, 2026',
        readTime: '8 min read',
        author: { name: 'Stra Journal', role: 'Editorial', avatar: '✍️' },
        coverEmoji: '📦',
        body: [
        { type: 'paragraph', text: "Nigeria's secondhand economy has always existed. What's changing is the infrastructure around it — and the expectations of the people participating in it." },
        { type: 'heading', text: 'The trust gap', level: 2 },
        { type: 'paragraph', text: "The core challenge for peer-to-peer commerce in Nigeria has never been supply or demand. There are plenty of sellers and plenty of buyers. The gap is trust. Without a structured way to verify products, protect payments, and manage delivery, every transaction is a leap of faith." },
        { type: 'quote', text: "The market doesn't need more listings. It needs better infrastructure around the listings that already exist." },
        { type: 'paragraph', text: "Platforms that solve the trust gap — with verification, escrow, and structured logistics — are positioned to capture a market that's large, growing, and deeply underserved by existing solutions." },
        ],
    },
    {
        slug: 'tunde-generator',
        title: "Tunde sold his generator in 48 hours. Here's what he did differently",
        excerpt: "Good photos, an honest description, and a verification video that showed the unit running. That's it.",
        category: 'seller-story',
        date: 'May 18, 2026',
        readTime: '4 min read',
        author: { name: 'Stra Journal', role: 'Editorial', avatar: '✍️' },
        coverEmoji: '⚡',
        body: [
        { type: 'paragraph', text: "Tunde had a 3.5KVA generator he no longer needed after getting a solar installation. He'd tried selling it through a WhatsApp group — three weeks of messages, tyre-kickers, and one person who showed up, inspected it for twenty minutes, and never called back." },
        { type: 'heading', text: 'The listing that worked', level: 2 },
        { type: 'paragraph', text: "On Stra, he did three things differently. He took photos in daylight showing the generator from every angle, including the fuel gauge and control panel. He wrote a description that was specific — brand, age, usage pattern, last service date. And he recorded a verification video of the unit starting up and running." },
        { type: 'quote', text: "I showed it working because that's what I'd want to see if I was buying it." },
        { type: 'paragraph', text: "The listing was approved the same day. It sold 48 hours later. The rider collected from him, delivered to the buyer, and Tunde received his payout the next morning." },
        ],
    },
    {
        slug: 'premium-plan-live',
        title: 'Premium Plan is now live — what sellers get and how it works',
        excerpt: "More reach, featured placement, and social media exposure for your listings. Everything about the new subscription plan.",
        category: 'update',
        date: 'May 9, 2026',
        readTime: '3 min read',
        author: { name: 'Stra Team', role: 'Official', avatar: '🏢' },
        coverEmoji: '⭐',
        body: [
        { type: 'paragraph', text: "The Stra Premium Plan is now available for sellers. Here's exactly what it includes and how it works." },
        { type: 'heading', text: 'What Premium gives you', level: 2 },
        { type: 'paragraph', text: "Premium listings are pushed to 3,500 buyers — more than double the 1,500 reach on the Basic plan. They receive featured placement in discovery feeds, priority listing review, and social media features on Stra's pages." },
        { type: 'quote', text: "Promotion increases visibility. More visibility means more buyers see your listing. That's the value." },
        { type: 'paragraph', text: "Premium costs ₦10,000 per month and works per product — you can promote one listing while keeping others on Basic. It's designed to be used selectively, for your best items or the ones you want to move quickly." },
        ],
    },
    ]

    export function getAllPosts(): Post[] {
    return POSTS
    }

    export function getFeaturedPost(): Post {
    return POSTS.find(p => p.featured) ?? POSTS[0]
    }

    export function getPostBySlug(slug: string): Post | undefined {
    return POSTS.find(p => p.slug === slug)
    }

    export function getPostsByCategory(category: Category): Post[] {
    return POSTS.filter(p => p.category === category)
    }

    export function getRelatedPosts(currentSlug: string, category: Category, limit = 3): Post[] {
    return POSTS
        .filter(p => p.slug !== currentSlug && p.category === category)
        .slice(0, limit)
    }