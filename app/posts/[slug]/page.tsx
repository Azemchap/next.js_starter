import PostPage from '@/components/sections/PostPage';
import { prisma } from '@/lib/db';
// import { Post } from '@prisma/client'; // Import Post type for better type safety

interface Params {
    slug: string;
}

// interface PageProps {
//     post?: Post; // Optional post prop
//     error?: string; // Optional error prop
// }

export default async function Page({ params }: { params: Params }): Promise<JSX.Element> {
    try {
        const post = await prisma.post.findUnique({
            where: { slug: params.slug },
        });

        if (!post) {
            return <p>Post not found</p>; // Handle case where the post does not exist
        }

        return <PostPage post={post} />; // Render the PostPage component
    } catch (error) {
        console.error("Error fetching post:", error);
        return (
            <div>
                <p>Error: Failed to fetch post</p>
            </div>
        ); // Handle error gracefully
    }
}