import { type InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
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
                    type="checkbox"
                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 ${className}`}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
