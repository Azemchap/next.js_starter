import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Create 10 users with hashed passwords
    const users = await Promise.all(
        Array.from({ length: 10 }).map(async (_, index) => {
            const plainPassword = `password${index + 1}`; // Example password
            const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash the password

            return prisma.user.create({
                data: {
                    hashedPassword,
                    email: `user${index + 1}@example.com`,
                },
            });
        })
    );

    // Create 10 posts, associating them with the users
    const posts = await Promise.all(
        users.map((user, index) => {
            return prisma.post.create({
                data: {
                    title: `Post Title ${index + 1}`,
                    slug: `post-title-${index + 1}`,
                    content: `This is the content for post ${index + 1}.`,
                    published: true, // Set to true to publish the posts
                    authorId: user.id, // Associate the post with the user
                },
            });
        })
    );

    console.log('Seeding completed!');
    console.log({ users, posts });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });