import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
    return (
        <section className='py-12'>
            <div className="container  text-center">

                <h1 className="text-6xl font-bold animate-bounce mt-6">404</h1>
                <p className="text-xl mt-4">Oops! The page you are looking for does not exist.</p>
                <div className="mt-6">
                    <Link href="/" passHref className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Go to Homepage
                    </Link>
                </div>
                <div className="mt-16">
                    <Image
                        src="/images/404.gif"
                        alt="Animated Character"
                        width={400} // Set your desired width
                        height={300} // Set your desired height
                        className="mx-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default NotFound;