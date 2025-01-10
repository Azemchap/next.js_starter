'use server'
import { redirect } from 'next/navigation';
import { prisma } from '../lib/db';

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = (formData.get('title') as string).replace(/\s+/g, "-").toLowerCase();

    await prisma.post.create({
        data: {
            title,
            content,
            slug,
            author: {
                connect: { email: 'user1@example.com' }
            }
        }
    });
    redirect('/posts');
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = title.replace(/\s+/g, "-").toLowerCase();

    await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            slug,
        }
    });
    redirect('/posts');
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: { id },
    });
    redirect('/posts');
}