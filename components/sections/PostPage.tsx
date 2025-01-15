'use client';

import { deletePost } from '@/actions/actions';
import { ConfirmDeleteModal } from '@/components/shared/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Post {
    id: string;
    title: string;
    content: string;
    slug: string;
}

interface PageProps {
    post: Post; // Pass the post as a prop
}

const PostPage: React.FC<PageProps> = ({ post }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deletePost(post.id); // Ensure post.id is available
            toast.success('Post deleted!', {
                autoClose: 4000,
            });
        } catch (error) {
            toast.error('Failed to delete post.', {
                autoClose: 4000,
            });
            console.error('Delete error:', error);
        } finally {
            setModalOpen(false);
        }
    };

    return (
        <section className='py-12'>
            <div className='container'>
                <div className='flex items-center gap-4 mb-6'>
                    <Link href={'/posts'} className='flex'>
                        <Button variant="secondary" size={'sm'}>
                            <ArrowLeft /> All posts
                        </Button>
                    </Link>
                    <Link href={`/posts/${post.slug}/edit`} className='flex ml-auto'>
                        <Button variant="outline" size={'sm'}>
                            <Pen /> Edit
                        </Button>
                    </Link>
                    <Button size="sm" variant="destructive" onClick={() => setModalOpen(true)}>
                        <Trash /> Delete
                    </Button>
                </div>

                <div className='max-w-screen-lg mx-auto min-h-96 p-4 bg-background/20 rounded border'>
                    <h2 className='text-2xl font-semibold mb-3'>{post.title}</h2>
                    <p>{post.content}</p>
                </div>

            </div>
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
            />
        </section>
    );
};

export default PostPage;