
import { createPost } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <section className='py-12'>
            <div className='max-w-screen-md mx-auto p-4'>
                <Link href={'/posts'} className='flex mb-6'>
                    <Button size={'sm'}><ArrowLeft /> All posts</Button>
                </Link>
                <h2 className='text-4xl font-semibold mb-5'>Create a post</h2>
                <form action={createPost} className='flex flex-col gap-y-2 border rounded p-6'>
                    <div className='mb-5'>
                        <label htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Post title"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none	bg-transparent"
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="content">Content</label>
                        <textarea
                            rows={8}
                            id="content"
                            name="content"
                            placeholder="Post content"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none	bg-transparent"
                        />
                    </div>
                    <Button type="submit" className='bg-primary '><Plus /> Create post</Button>
                </form>
            </div>
        </section>
    )
}
