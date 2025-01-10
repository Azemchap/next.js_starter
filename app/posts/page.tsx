import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function page() {
    // const posts = await prisma.post.findMany()
    // const postCount = await prisma.post.count()

    const user = await prisma.user.findUnique({
        where: {
            email: 'user1@example.com'
        },
        include: { posts: true }
    })
    // const userPostCount = await prisma.user.findUnique({
    //     where: {
    //         email: 'azem@gmail.com'
    //     },
    //     include: { posts: true }
    // }).posts
    // // const userPostCount = await prisma.post.count()

    return (
        <section className='py-12'>
            <div className='container'>
                <div className='flex items-center justify-between gap-4  mb-6'>
                    <h2 className='text-2xl font-semibold'>All posts ({user?.posts.length})</h2>
                    <Link href={'/posts/create'}>
                        <Button size={'lg'} className='capitalize'><Plus /> Create Post</Button>
                    </Link>
                </div>
                <ul className='border-t border-b border-primary/10 py-4 leading-8'>
                    {
                        user?.posts.map((post) => (
                            <Link href={`/posts/${post.slug}`} key={post.id} >
                                <li className='flex items-center justify-between px-5 py-1 hover:bg-secondary/60'>
                                    {post.title}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
