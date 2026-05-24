import { Bell, ChevronDown, ArrowLeft, LayoutGrid } from 'lucide-react';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
}

export default function Header({ title = 'Assignment', showBack = false }: HeaderProps) {
    return (
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-3 text-gray-500">
                {showBack && (
                    <button className="hover:text-gray-900 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                )}
                <LayoutGrid size={18} />
                <span className="text-sm text-gray-600">{title}</span>
            </div>

            <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <div className="relative">
                    <button className="p-2 rounded-full hover:bg-gray-50 transition-colors">
                        <Bell size={18} className="text-gray-500" />
                    </button>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                </div>

                {/* User */}
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full px-2 py-1 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-700">JD</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">John Doe</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
            </div>
        </header>
    );
}