
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
        <div className='max-w-screen-md mx-auto p-4'>
            <div className='flex items-center justify-between gap-4 mb-6'>
                <h2 className='text-2xl font-semibold'>All posts ({userPostCount})</h2>
                <Link href={'/posts/create'}>
                    <Button variant="outline" className='capitalize'>
                        <Plus /> Create Post
                    </Button>
                </Link>
            </div>
            <div className='border-t border-primary/10'></div>
            {userPosts.length === 0 ? (
                <NotFound message='No post available' />
            ) : (
                <ul className=' py-4 leading-8'>
                    {userPosts.map((post, index) => (
                        <Link href={`/posts/${post.slug}`} key={post.id}>
                            <li className='flex items-center gap-2 px-5 py-1 hover:bg-secondary/60'>
                                <span>{`${index + 1}.`}</span> {post.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    </section>
);

// Server Component with ISR
const Page = async () => {
    const userEmail = 'user1@example.com';

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { posts: true },
    });

    const userPostCount: number = await prisma.post.count({
        where: { authorId: user?.id },
    });

    return (
        <PostSection userPostCount={userPostCount} userPosts={user?.posts || []} />
    )
};

// Set revalidation time for ISR
export const dynamic = 'force-dynamic';
export const revalidate = 10;

export default Page;