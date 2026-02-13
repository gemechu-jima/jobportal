import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md'
}: ModalProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            {/* Backdrop Overlay */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full ${sizeClasses[size]} mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all flex flex-col max-h-full`}>
                {(title) && (
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-text-main dark:text-white tracking-tight">{title}</h3>
                        <button 
                            onClick={onClose} 
                            className="p-2 -mr-2 text-gray-400 hover:text-text-main hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                
                <div className="px-6 py-6 overflow-y-auto">
                    {children}
                </div>

                {footer && (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex flex-row-reverse gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Modal;
