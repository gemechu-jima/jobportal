interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const Avatar = ({src, alt = '',name, size = 'md', className = ''}: AvatarProps) => {
    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg'
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${sizeClasses[size]} ${className}`}>
            {src ? (
                <img className="object-cover w-full h-full" src={src} alt={alt} />
            ) : (
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {name ? getInitials(name) : '?'}
                </span>
            )}
        </div>
    );
};

export default Avatar;
