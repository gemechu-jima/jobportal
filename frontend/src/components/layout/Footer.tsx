import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="font-bold">J</span>
                            </div>
                            <span className="text-lg font-bold text-text-main dark:text-white">JobPortal</span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Connecting brilliant minds with world-class opportunities. The most trusted platform for professionals and employers alike.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-text-main dark:text-white font-semibold mb-6">For Candidates</h4>
                        <ul className="space-y-4">
                            <li><Link to="/jobs" className="text-text-muted text-sm hover:text-primary transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/categories" className="text-text-muted text-sm hover:text-primary transition-colors">Job Categories</Link></li>
                            <li><Link to="/resume" className="text-text-muted text-sm hover:text-primary transition-colors">Resume Builder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-text-main dark:text-white font-semibold mb-6">For Employers</h4>
                        <ul className="space-y-4">
                            <li><Link to="/post-job" className="text-text-muted text-sm hover:text-primary transition-colors">Post a Job</Link></li>
                            <li><Link to="/hiring-solutions" className="text-text-muted text-sm hover:text-primary transition-colors">Hiring Solutions</Link></li>
                            <li><Link to="/pricing" className="text-text-muted text-sm hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-text-main dark:text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/help" className="text-text-muted text-sm hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/contact" className="text-text-muted text-sm hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/privacy" className="text-text-muted text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-xs">
                        &copy; {currentYear} JobPortal Hub. Built for your next career move.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-text-muted hover:text-primary transition-colors text-xs">Twitter</a>
                        <a href="#" className="text-text-muted hover:text-primary transition-colors text-xs">LinkedIn</a>
                        <a href="#" className="text-text-muted hover:text-primary transition-colors text-xs">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
