'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, FileText, Plus, FilePlus, Sparkles } from 'lucide-react';

const navItems = [
    { label: 'Home', icon: LayoutGrid, href: '/', active: true },
    { label: 'Assignments', icon: FileText, href: '/assignments', active: true },
    { label: 'Library', icon: FilePlus, href: '/library', active: false },
    { label: 'AI Toolkit', icon: Sparkles, href: '/toolkit', active: false },
];

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>
            {/* Floating Create Button */}
            <button
                onClick={() => router.push('/assignments/create')}
                className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all active:scale-95"
            >
                <Plus size={26} className="text-[#FF7A3D]" />
            </button>

            {/* Bottom Navigation */}
            <div className="fixed bottom-4 left-0 right-0 px-4 z-[10000] pointer-events-none">
                <div className="mx-auto flex h-[72px] max-w-sm items-center justify-around rounded-[26px] bg-[#181818] px-3 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
                    {navItems.map(({ label, icon: Icon, href, active }) => {
                        const isActive =
                            pathname === href ||
                            (href === '/assignments' && pathname.startsWith('/assignments'));

                        return (
                            <button
                                key={href}
                                onClick={() => { if (active) router.push(href) }}
                                className="relative flex min-w-[64px] flex-col items-center justify-center gap-1 transition-all pointer-events-auto"
                            >
                                <Icon
                                    size={19}
                                    strokeWidth={2.2}
                                    className={isActive ? 'text-white' : 'text-[#6B6B6B]'}
                                />

                                <span
                                    className={`text-[11px] font-medium transition-colors ${isActive ? 'text-white' : 'text-[#6B6B6B]'
                                        }`}
                                >
                                    {label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}