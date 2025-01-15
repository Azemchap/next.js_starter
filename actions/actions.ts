'use server'
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';

export async function createPost(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const slug = title.replace(/\s+/g, "-").toLowerCase();

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
                // Optionally, you might want to redirect or return an error message
            }
        }
        console.error('Error creating post:', error);
        redirect('/posts'); // Redirect in case of error
    }
}

export async function updatePost(id: string, formData: FormData) {
    try {
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
    } catch (error) {
        console.error('Error updating post:', error);
        // Optionally handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle known request errors here if needed
        }
        redirect('/posts'); // Redirect in case of error
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id },
        });
        redirect('/posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        // Optionally handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle known request errors here if needed
        }
        redirect('/posts'); // Redirect in case of error
    }
}