import type { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
    className?: string;
}

const Badge = ({
    children,
    variant = 'gray',
    className = ''
}: BadgeProps) => {
    const variants = {
        primary: 'bg-primary-light text-primary dark:bg-primary/20 dark:text-primary-light',
        success: 'bg-success-light text-success dark:bg-success/20 dark:text-success-light',
        warning: 'bg-warning-light text-warning dark:bg-warning/20 dark:text-warning-light',
        danger: 'bg-danger-light text-danger dark:bg-danger/20 dark:text-danger-light',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        gray: 'bg-gray-100 text-text-muted dark:bg-gray-700 dark:text-gray-300'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
