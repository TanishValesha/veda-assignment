import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from 'lucide-react';
import userAvatar from '../../public/icons/avatar.png';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
}

export default function Header({ title = 'Assignment', showBack = false }: HeaderProps) {
    return (
        <header
            className="h-14 top-2 ml-6 bg-white flex items-center justify-between px-6 sticky z-10 rounded-[16px]"
            style={{ boxShadow: '0px 4px 24px 0px rgba(0,0,0,0.06)' }}
        >
            {/* Left */}
            <div className="flex items-center gap-2.5">
                {showBack && (
                    <Link href="/assignments">
                        <button className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
                            <ArrowLeft size={24} className="text-black" />
                        </button>
                    </Link>
                )}
                <div className="flex items-center gap-2">
                    <LayoutGrid size={20} className="text-gray-400" />
                    <span className="text-md text-gray-500">{title}</span>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

                {/* Bell */}
                <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
                    <Bell size={24} className="text-black" />
                    <span
                        className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-red-500"
                        style={{ boxShadow: '0 0 0 1.5px white' }}
                    />
                </button>

                {/* Divider */}
                <div className="w-px h-5 bg-gray-200 mx-1" />

                {/* User */}
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full pl-1 pr-3 py-1 transition-colors">
                    <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
                        <Image
                            src={userAvatar}
                            alt="John Doe"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="text-md font-medium text-black">John Doe</span>
                    <ChevronDown size={24} className="text-black" />
                </button>
            </div>
        </header>
    );
}