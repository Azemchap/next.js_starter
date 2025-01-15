

// import PostPage from '@/components/sections/PostPage';
// import NotFound from '@/components/shared/NotFound';
// import prisma from '@/lib/db';

// interface Params {
//     slug: string;
// }

// export default async function SinglePostPage({ params }: { params: Params }) {

//     console.log("Fetching post with slug:", params.slug);
//     const post = await prisma.post.findUnique({
//         where: { slug: params.slug },
//     });

//     if (!post) {
//         return <NotFound message={'Post not available'} />;
//     }

//     return <PostPage post={post} />;
// }

import PostPage from '@/components/sections/PostPage';
import NotFound from '@/components/shared/NotFound';
import prisma from '@/lib/db';

interface Params {
    slug: string;
}

export default async function SinglePostPage({ params }: { params: Params }) {
    console.log("Fetching post with slug:", params.slug);

    // Fetch the post from the database
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    // Return NotFound component if post is not found
    if (!post) {
        return <NotFound message={'Post not available'} />;
    }

    // Return the PostPage component with the fetched post data
    return <PostPage post={post} />;
}