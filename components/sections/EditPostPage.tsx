'use client';

import { updatePost } from '@/actions/actions';
import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Post {
    id: string;
    title: string;
    content: string;
}

interface EditPostProps {
    post: Post
}

const EditPost: React.FC<EditPostProps> = ({ post }) => {
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        try {
            await updatePost(post.id, formData);
            toast.success('Changes saved!');
        } catch (error) {
            console.error('Error saving changes:', error);
            toast.error('Failed to save changes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='py-12'>
            <div className='max-w-screen-md mx-auto p-4'>
                <Link href={'/posts'} className='inline-flex mb-6'>
                    <Button size={'sm'}><ArrowLeft /> All posts</Button>
                </Link>
                <h2 className='text-lg font-semibold mb-6 uppercase'>Update post</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
                    <div className='mb-5'>
                        <label htmlFor="title">Post Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            name="title"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none bg-transparent"
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="content">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            id="content"
                            name="content"
                            className="w-full border border-slate-200 rounded py-3 mt-2 px-4 outline-none bg-transparent"
                            required
                        />
                    </div>
                    <Button type="submit" className='bg-primary'>
                        {isLoading ? <Spinner message='Saving...' /> : <><Plus /> Save Changes</>}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;