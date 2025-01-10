import PostPage from '@/components/sections/PostPage';
import { prisma } from '@/lib/db';

interface Params {
    slug: string;
}

export default async function Page({ params }: { params: Params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug }
    });

    if (!post) {
        return <p>Post not found </p>;
    }

    return <PostPage post={post} />;
}