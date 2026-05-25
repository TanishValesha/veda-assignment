'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';
import homeIcon from '../../public/icons/home.png';
import groupsIcon from '../../public/icons/groups.png';
import assignmentsIcon from '../../public/icons/assignment.png';
import toolkitIcon from '../../public/icons/book.png';
import libraryIcon from '../../public/icons/library.png';
// import settingsIcon from '@/assets/icons/settings.png';
import sparklesIcon from '../../public/icons/sparkles.png';
import schoolAvatar from '../../public/icons/avatar.png';
import { Settings } from 'lucide-react';
import { useAssignmentStore } from '../../store/assignmentStore';

const navItems = [
    { label: 'Home', icon: homeIcon, href: '/' },
    { label: 'My Groups', icon: groupsIcon, href: '/groups' },
    { label: 'Assignments', icon: assignmentsIcon, href: '/assignments' },
    { label: "AI Teacher's Toolkit", icon: toolkitIcon, href: '/toolkit' },
    { label: 'My Library', icon: libraryIcon, href: '/library' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const assignmentsCount = useAssignmentStore(
        (s) => s.assignmentsCount
    );

    return (
        <aside
            className="fixed left-2 top-2 h-screen flex flex-col bg-white z-20 rounded-[16px]"
            style={{
                width: '280px',
                boxShadow: '40px 2px 40px 2px rgba(0,0,0,0.06)',
            }}
        >
            {/* Logo */}
            <div className="px-5 py-5">
                <div className="flex items-center gap-2">
                    <Image src={logo} alt="VedaAI" width={40} height={40} className="object-contain" />
                    <span className="font-bold text-gray-900 text-2xl tracking-tight">VedaAI</span>
                </div>
            </div>

            {/* Create Assignment Button */}
            <div className="px-5 mt-6 mb-16">
                <Link href="/assignments/create">
                    <div
                        className="w-full p-[3px] rounded-full"
                        style={{
                            background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)',
                        }}
                    >
                        <div
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white text-md font-semibold transition-all hover:scale-102 active:scale-[0.98]"
                            style={{ background: '#1a1a1a' }}
                        >
                            <Image src={sparklesIcon} alt="" width={18} height={18} />
                            Create Assignment
                        </div>
                    </div>
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 space-y-0.5">
                {navItems.map(({ label, icon, href }) => {
                    const isActive = pathname === href ||
                        (href === '/assignments' && pathname.startsWith('/assignments'));

                    return (
                        <Link key={href} href={href}>
                            <div
                                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-md cursor-pointer transition-all duration-150
                  ${isActive
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800'
                                    }`}
                            >
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={20}
                                    height={20}
                                    className={`object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'
                                        }`}
                                />
                                {label}

                                {label === "Assignments" && (
                                    <div className='pl-8'>
                                        <div className="min-w-[22px] h-[22px] flex px-4 py-1 items-center justify-center rounded-full bg-[#FF6A2B] text-white text-sm font-semibold leading-none">
                                            {assignmentsCount}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="px-3 pb-5">
                {/* Settings */}
                <Link href="/settings">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-md text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800 cursor-pointer transition-all duration-150 mb-2">
                        <Settings size={18} className="text-gray-400" />
                        Settings
                    </div>
                </Link>

                {/* School Profile Card */}
                <div
                    className="flex items-center gap-3 px-3 py-3 rounded-2xl mt-1 cursor-pointer transition-all duration-150 hover:brightness-95"
                    style={{ background: '#F5F5F5' }}
                >
                    <div className="w-[59px] h-[59px] rounded-full overflow-hidden shrink-0">
                        <Image
                            src={schoolAvatar}
                            alt="School"
                            width={59}
                            height={59}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-md font-bold text-gray-900 truncate">Delhi Public School</p>
                        <p className="text-sm text-gray-400 truncate">Bokaro Steel City</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}