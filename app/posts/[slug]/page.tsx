import PostPage from '@/components/sections/PostPage';
import { prisma } from '@/lib/db';

interface Params {
    slug: string;
}

export default async function Page({ params }: { params: Params }) {

    try {
        const post = await prisma.post.findUnique({
            where: { slug: params.slug }
        });

        if (!post) {
            return <p>Post not found </p>;
        }

        return <PostPage post={post} />;
    } catch (error) {
        console.error("Error fetching post:", error);
        return { props: { error: "Failed to fetch post" } };
    }
}