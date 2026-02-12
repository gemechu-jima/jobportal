import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    footer?: ReactNode;
}

const Card = ({
    children,
    title,
    subtitle,
    className = '',
    footer
}: CardProps) => {
    return (
        <div className={`bg-bg-card dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                    {title && <h3 className="text-lg font-semibold text-text-main dark:text-white">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-text-muted dark:text-gray-400">{subtitle}</p>}
                </div>
            )}
            <div className="px-6 py-4">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
