import { Link } from 'react-router-dom';
import { Button, Card, Input } from '../../components/common';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-text-main dark:text-white mb-6 tracking-tight">
                        Find Your Next <br />
                        <span className="text-primary italic">Dream Opportunity</span>
                    </h1>
                    <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of companies and millions of candidates on the most trusted career platform. Your future starts with a single search.
                    </p>

                    <Card className="max-w-4xl mx-auto p-4 shadow-2xl relative">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 text-left w-full">
                                <Input
                                    label="What are you looking for?"
                                    placeholder="Job title, keywords, or company"
                                    className="mb-0"
                                />
                            </div>
                            <div className="flex-1 text-left w-full">
                                <Input
                                    label="Where?"
                                    placeholder="City or remote"
                                    className="mb-0"
                                />
                            </div>
                            <Link to="/jobs" className="w-full md:w-auto">
                                <Button variant="primary" size="lg" className="w-full h-[42px] px-8">
                                    Search Jobs
                                </Button>
                            </Link>

                        </div>
                    </Card>

                    <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-text-muted">
                        <span>Popular:</span>
                        <a href="#" className="hover:text-primary transition-colors underline decoration-primary/30">Frontend Engineer</a>
                        <a href="#" className="hover:text-primary transition-colors underline decoration-primary/30">Product Designer</a>
                        <a href="#" className="hover:text-primary transition-colors underline decoration-primary/30">Backend Developer</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-bg-main dark:bg-gray-800/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4">Why Choose JobPortal?</h2>
                        <p className="text-text-muted max-w-xl mx-auto">We provide the tools and connections you need to succeed in the modern job market.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="p-8 hover:shadow-xl transition-shadow border-none bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6">
                                🚀
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-text-main dark:text-white">Fast Hiring</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Our AI-powered matching system connects the right talent with the right opportunities in record time.
                            </p>
                        </Card>

                        <Card className="p-8 hover:shadow-xl transition-shadow border-none bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success text-2xl mb-6">
                                🔒
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-text-main dark:text-white">Secure Platform</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Verified companies and data protection ensure your job search or hiring process is private and safe.
                            </p>
                        </Card>

                        <Card className="p-8 hover:shadow-xl transition-shadow border-none bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center text-warning text-2xl mb-6">
                                📈
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-text-main dark:text-white">Career Growth</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Detailed insights, salary benchmarks, and company reviews to help you make informed decisions.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
                    <p className="text-primary-light mb-10 opacity-90 max-w-xl mx-auto">
                        Whether you're hiring your first employee or looking for your next challenge, we're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100">
                                Create Free Account
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                                Sign In Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
