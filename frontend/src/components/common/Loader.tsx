import Spinner from './Spinner';

interface LoaderProps {
    fullPage?: boolean;
    text?: string;
}

const Loader = ({ fullPage = false, text = 'Loading...' }: LoaderProps) => {
    const content = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <Spinner size="lg" />
            {text && <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[60] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                {content}
            </div>
        );
    }

    return content;
};

export default Loader;
