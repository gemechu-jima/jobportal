import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    label,
    error,
    fullWidth = true,
    className = '',
    id,
    ...props
}, ref) => {
    const areaClasses = `
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
            <textarea
                id={id}
                ref={ref}
                className={areaClasses}
                rows={4}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
