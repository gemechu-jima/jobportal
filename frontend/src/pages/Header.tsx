import { Link } from 'react-router-dom';
import { Button } from '../components/common';

const Header = () => {
    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                        <span className="text-xl font-bold">J</span>
                    </div>
                    <span className="text-xl font-bold text-text-main dark:text-white tracking-tight">
                        Job<span className="text-primary">Portal</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Home</Link>
                    <Link to="/jobs" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Find Jobs</Link>
                    <Link to="/companies" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Companies</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="primary" size="sm">
                            Join Now
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
