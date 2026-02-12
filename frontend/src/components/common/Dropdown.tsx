import { useState, useRef, useEffect, type ReactNode } from 'react';

interface DropdownOption {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    variant?: 'default' | 'danger';
}

interface DropdownProps {
    trigger: ReactNode;
    options: DropdownOption[];
    align?: 'left' | 'right';
}

const Dropdown = ({ trigger, options, align = 'right' }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
            {isOpen && (
                <div
                    className={`origin-top-right absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50`}
                >
                    <div className="py-1">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    option.onClick();
                                    setIsOpen(false);
                                }}
                                className={`flex items-center w-full px-4 py-2 text-sm ${option.variant === 'danger'
                                        ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {option.icon && <span className="mr-3">{option.icon}</span>}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
