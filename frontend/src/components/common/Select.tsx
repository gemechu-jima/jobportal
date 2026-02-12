import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    options,
    error,
    fullWidth = true,
    className = '',
    id,
    ...props
}, ref) => {
    const selectClasses = `
        block rounded-md border shadow-sm transition-colors focus:ring-2 focus:ring-offset-0 
        ${error
            ? 'border-danger text-danger focus:border-danger focus:ring-danger'
            : 'border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white'
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
            <select
                id={id}
                ref={ref}
                className={selectClasses}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
