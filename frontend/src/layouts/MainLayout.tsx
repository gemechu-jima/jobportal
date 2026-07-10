import { Outlet } from 'react-router-dom';
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-bg-main">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;

