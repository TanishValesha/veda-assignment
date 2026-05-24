import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBack?: boolean;
}

export default function AppLayout({ children, title, showBack }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div style={{ marginLeft: '280px' }}>
                <Header title={title} showBack={showBack} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}