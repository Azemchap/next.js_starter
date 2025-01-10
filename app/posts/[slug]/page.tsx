import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Params {
    slug: string;
}

export default async function page({ params }: { params: Params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug }
    })

    return (
        <section className='py-12'>
            <div className='container'>
                <Link href={'/posts'} className='flex mb-6'>
                    <Button size={'sm'}><ArrowLeft /> All posts</Button>
                </Link>
                <h2 className='text-2xl font-semibold mb-3'>{post?.title}</h2>
                <p>{post?.content}</p>

                {/* <Badge></Badge> */}
            </div>
        </section>
    )
}
