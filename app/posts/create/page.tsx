'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Spinner from '@/components/shared/Spinner';
import { createPost } from '@/actions/actions';
import { toast } from 'react-toastify'; // Import toast

export default function Page() {
    const [isLoading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state to true

        const formData = new FormData(event.currentTarget);

        try {
            await createPost(formData); // Call the server action directly
            toast.success('Post created successfully!', {
                autoClose: 4000,
            });
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post.', {
                autoClose: 4000,
            });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <section className='py-12'>
            <div className='max-w-screen-md mx-auto p-4'>
                <Link href={'/posts'} className='inline-flex mb-6'>
                    <Button size={'sm'}><ArrowLeft /> All posts</Button>
                </Link>
                <h2 className='text-4xl font-semibold mb-5'>Create a post</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 border rounded p-6'>
                    <div className='mb-5'>
                        <label htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Post title"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none bg-transparent"
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="content">Content</label>
                        <textarea
                            rows={8}
                            id="content"
                            name="content"
                            placeholder="Post content"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none bg-transparent"
                            required
                        />
                    </div>
                    <Button type="submit" className='bg-primary'>
                        {isLoading ? <Spinner message='Creating post...' /> : <><Plus /> Create post</>}
                    </Button>
                </form>
            </div>
        </section>
    );
}