import { type InputHTMLAttributes, forwardRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
    label,
    error,
    className = '',
    id,
    ...props
}, ref) => {
    return (
        <div className="mb-4">
            <div className="flex items-center">
                <input
                    id={id}
                    ref={ref}
                    type="radio"
                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600 ${className}`}
                    {...props}
                />
                {label && (
                    <label htmlFor={id} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        {label}
                    </label>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
});

Radio.displayName = 'Radio';

export default Radio;
