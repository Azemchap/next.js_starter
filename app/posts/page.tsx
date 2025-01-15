import NotFound from '@/components/shared/NotFound';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Post {
    id: string;
    title: string;
    slug: string;
}

interface PostSectionProps {
    userPostCount: number;
    userPosts: Post[];
}

const PostSection: React.FC<PostSectionProps> = ({ userPostCount, userPosts }) => (
    <section className='py-12'>
        <div className='container'>
            <div className='flex items-center justify-between gap-4 mb-6'>
                <h2 className='text-2xl font-semibold'>All posts ({userPostCount})</h2>
                <Link href={'/posts/create'}>
                    <Button size={'lg'} className='capitalize'>
                        <Plus /> Create Post
                    </Button>
                </Link>
            </div>
            {userPosts.length === 0 ? (
                <div className='border-t border-b border-primary/10 text-center py-16 leading-8'>
                    <NotFound message='No post available' />
                </div>
            ) : (
                <ul className='border-t border-b border-primary/10 py-4 leading-8'>
                    {userPosts.map((post) => (
                        <Link href={`/posts/${post.slug}`} key={post.id}>
                            <li className='flex items-center justify-between px-5 py-1 hover:bg-secondary/60'>
                                {post.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    </section>
);

export const getStaticProps = async () => {
    const userEmail = 'user1@example.com';

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { posts: true },
    });

    const userPostCount: number = await prisma.post.count({
        where: { authorId: user?.id }, // Assuming you have an authorId in your post model
    });

    return {
        props: {
            userPostCount,
            userPosts: user?.posts || [],
        },
        revalidate: 10, // Revalidate every 10 seconds
    };
};

// Define Page type to accept PostSectionProps
const Page: React.FC<PostSectionProps> = ({ userPostCount, userPosts }) => {
    return <PostSection userPostCount={userPostCount} userPosts={userPosts} />;
};

export default Page;

// const PostsPage: React.FC = async () => {
//     const userEmail = 'user1@example.com';

//     const user = await prisma.user.findUnique({
//         where: {
//             email: userEmail,
//         },
//         include: { posts: true },
//     });

//     const userPostCount: number = await prisma.post.count({
//         where: {
//             authorId: user?.id, // Assuming you have an authorId in your post model
//         },
//     });

//     return <PostSection userPostCount={userPostCount} userPosts={user?.posts || []} />;
// };

// export default PostsPage;