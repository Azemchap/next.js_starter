/* eslint-disable */

import PostPage from '@/components/sections/PostPage';
import { prisma } from '@/lib/db';
import { Post } from '@prisma/client';

interface Params {
    slug: string;
}

interface PageProps {
    post?: Post;
    error?: string;
}

export default async function Page({ params }: { params: Params }): Promise<JSX.Element> {
    try {
        const post = await prisma.post.findUnique({
            where: { slug: params.slug },
        });

        if (!post) {
            return <p>Post not found</p>;
        }

        return <PostPage post={post} />;
    } catch (error) {
        console.error("Error fetching post:", error);
        return (
            <div>
                <p>Error: Failed to fetch post</p>
            </div>
        );
    }
}