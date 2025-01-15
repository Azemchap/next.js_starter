// components/Spinner.tsx

import React from 'react';

interface NotFoundProps {
    message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
    return (
        <section className='py-12'>
            <div className='container text-center'>
                <p className='text-2xl mb-2 text-primary/70'>{message}</p>
                <p className='text-muted-foreground max-w-xs mx-auto text-sm'>Create a post to let others interact with your posts</p>
            </div>
        </section>
    );
};

export default NotFound;