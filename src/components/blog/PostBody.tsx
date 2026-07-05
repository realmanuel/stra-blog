    import { Block } from '@/lib/posts'

    export default function PostBody({ blocks }: { blocks: Block[] }) {
    return (
        <div className="flex flex-col">
        {blocks.map((block, i) => {
            if (block.type === 'paragraph') {
            return (
                <p
                key={i}
                className="mb-6"
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    lineHeight: '2',
                    color: 'rgba(242,240,235,0.65)',
                }}
                >
                {block.text}
                </p>
            )
            }

            if (block.type === 'heading') {
            return (
                <h2
                key={i}
                className="font-bold mt-12 mb-5"
                style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '26px',
                    letterSpacing: '-0.02em',
                    color: '#F2F0EB',
                }}
                >
                {block.text}
                </h2>
            )
            }

            if (block.type === 'quote') {
            return (
                <blockquote
                key={i}
                className="my-8 px-7 py-5"
                style={{
                    borderLeft: '2px solid #C8FF00',
                    background: 'rgba(200,255,0,0.03)',
                }}
                >
                <p
                    style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '20px',
                    lineHeight: '1.6',
                    color: '#F2F0EB',
                    }}
                >
                    {block.text}
                </p>
                </blockquote>
            )
            }

            return null
        })}
        </div>
    )
    }