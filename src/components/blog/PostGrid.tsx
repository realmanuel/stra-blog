    import type { SanityPostStub } from '@/sanity/types'
    import PostCard from './PostCard'

    interface PostGridProps {
    posts: SanityPostStub[]
    columns?: 2 | 3 | 4
    }

    export default function PostGrid({ posts, columns = 3 }: PostGridProps) {
    if (!posts.length) return null

    const colClass = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns]

    return (
        <div
        className={`grid ${colClass}`}
        style={{ borderBottom: '1px solid rgba(242,240,235,0.08)' }}
        >
        {posts.map((post) => (
            <PostCard key={post._id} post={post} variant="default" />
        ))}
        </div>
    )
    }