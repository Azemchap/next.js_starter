// components/Spinner.tsx

import Link from 'next/link';
import React from 'react';

interface NotFoundProps {
    message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
    return (
        <section className='py-12'>
            <div className='container text-center border border-destructive/40 py-12 rounded bg-destructive/10'>
                <p className='text-2xl mb-2 text-destructive/60'>{message}</p>
                <Link href={'/posts'} className='text-muted-foreground underline underline-offset-2'>View all posts</Link>
            </div>
        </section>
    );
};

export default NotFound;