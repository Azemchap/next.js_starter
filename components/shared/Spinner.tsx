// components/Spinner.tsx

import React from 'react';

interface SpinnerProps {
    message: string; // Define the message prop type
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
    return (
        <div className="flex justify-center gap-2 items-center">
            <span className="border-4 border-blue-500 border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
            <span>{message}</span>
        </div>
    );
};

export default Spinner;