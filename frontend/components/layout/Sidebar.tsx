'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    Users,
    FileText,
    Wrench,
    BookOpen,
    Settings,
    Sparkles,
} from 'lucide-react';

const navItems = [
    { label: 'Home', icon: LayoutGrid, href: '/' },
    { label: 'My Groups', icon: Users, href: '/groups' },
    { label: 'Assignments', icon: FileText, href: '/assignments' },
    { label: "AI Teacher's Toolkit", icon: Wrench, href: '/toolkit' },
    { label: 'My Library', icon: BookOpen, href: '/library' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="fixed left-0 top-0 h-screen flex flex-col bg-white border-r border-gray-100 z-10"
            style={{ width: '280px' }}
        >
            {/* Logo */}
            <div className="px-5 py-5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #E8581A, #F97316)' }}>
                        <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">VedaAI</span>
                </div>
            </div>

            {/* Create Assignment Button */}
            <div className="px-4 mb-6">
                <Link href="/assignments/create">
                    <button
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #1a1a1a, #333)' }}
                    >
                        <Sparkles size={15} />
                        Create Assignment
                    </button>
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 space-y-0.5">
                {navItems.map(({ label, icon: Icon, href }) => {
                    const isActive = pathname === href;
                    return (
                        <Link key={href} href={href}>
                            <div
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${isActive
                                    ? 'bg-gray-100 text-gray-900 font-medium'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }`}
                            >
                                <Icon size={17} />
                                {label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 pb-4 space-y-0.5">
                <Link href="/settings">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                        <Settings size={17} />
                        Settings
                    </div>
                </Link>

                {/* School Profile */}
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 mt-2">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-bold text-orange-600">DPS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Delhi Public School</p>
                        <p className="text-xs text-gray-400 truncate">Bokaro Steel City</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}