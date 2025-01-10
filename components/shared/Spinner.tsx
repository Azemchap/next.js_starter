// components/Spinner.tsx

const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center gap-2 items-center ">
            <div className="border-4 border-blue-500 border-t-transparent rounded-full w-6 h-6 animate-spin"></div> Post creating...
        </div>
    );
};

export default Spinner;