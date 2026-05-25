import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBack?: boolean;
}

export default function AppLayout({ children, title, showBack }: AppLayoutProps) {
    return (
        <>
            <div className="min-h-screen bg-gray-100 hidden md:block">
                <Sidebar />
                <div style={{ marginLeft: '280px' }}>
                    <Header title={title} showBack={showBack} />
                    <main className="p-6">{children}</main>
                </div>
            </div>

            <div className="block md:hidden min-h-screen pb-20">
                <MobileHeader />
                <main className="p-4">{children}</main>
                <BottomNav />
            </div>
        </>
    );
}