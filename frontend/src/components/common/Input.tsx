import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    fullWidth = true,
    className = '',
    id,
    ...props
}, ref) => {
    const inputClasses = `
        block rounded-md border shadow-sm transition-colors focus:ring-2 focus:ring-offset-0 
        ${error
            ? 'border-danger text-danger placeholder-danger/60 focus:border-danger focus:ring-danger'
            : 'border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
        }
        px-3 py-2 text-sm bg-bg-card
        ${fullWidth ? 'w-full' : ''}
        ${className}
    `.trim();

    return (
        <div className={`${fullWidth ? 'w-full' : ''} mb-4 text-left`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-text-main dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                ref={ref}
                className={inputClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-danger" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
