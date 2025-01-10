'use server'
import { redirect } from 'next/navigation';
import { prisma } from '../lib/db';
import { Prisma } from '@prisma/client';

export async function createPost(formData: FormData) {
    try {
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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                console.log("There is a unique constraint violation, a new user cannot be created with this email!");
            }
        }

        redirect('/posts');
    }
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