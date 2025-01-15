import PostPage from '@/components/sections/PostPage';
import NotFound from '@/components/shared/NotFound';
import prisma from '@/lib/db';

interface Params {
    slug: string;
}

export default async function SinglePostPage({ params }: { params: Params }) {

    let post;
    try {
        post = await prisma.post.findUnique({
            where: { slug: params.slug },
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return <NotFound message={'Error fetching post'} />;
    }

    if (!post) {
        return <NotFound message={'Post not available'} />;
    }

    return <PostPage post={post} />;
}