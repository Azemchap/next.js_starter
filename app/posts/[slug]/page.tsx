/* eslint-disable */

import PostPage from '@/components/sections/PostPage';
import { prisma } from '@/lib/db';

interface Params {
    slug: string;
}

export default async function Page({ params }: { params: Params }) {
    // try {
    //     const post = await prisma.post.findUnique({
    //         where: { slug: params.slug },
    //     });

    //     if (!post) {
    //         return <p>Post not found</p>; // Return a fallback message
    //     }

    //     return <PostPage post={post} />;
    // } catch (error) {
    //     console.error("Error fetching post:", error);
    //     return <p>Error: Failed to fetch post</p>; // Gracefully handle the error
    // }
    try {
        console.log("Fetching post with slug:", params.slug);
        const post = await prisma.post.findUnique({
            where: { slug: params.slug },
        });

        if (!post) {
            return <p>Post not found</p>; // Return a fallback message
        }

        return <PostPage post={post} />;
    } catch (error) {
        console.error("Error fetching post:", error);
        return <p>Error: Failed to fetch post</p>; // Gracefully handle the error
    }
}