import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';
import logo from '../../public/icons/mobile_logo_better.png';
import userAvatar from '../../public/icons/avatar.png';

export default function MobileHeader() {
    return (
        <header
            className="h-14 bg-white flex items-center justify-between px-4 mx-2  rounded-2xl sticky top-2 z-10"
            style={{ boxShadow: '0px 2px 12px 0px rgba(0,0,0,0.06)' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Image
                    src={logo}
                    alt="VedaAI"
                    width={28}
                    className="object-contain rounded-md"
                />
                <span className="font-bold text-gray-900 text-xl md:text-2xl tracking-tight">VedaAI</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Bell */}
                <button className="relative p-2">
                    <Bell size={24} className="text-gray-500" />
                    <span
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
                        style={{ boxShadow: '0 0 0 1.5px white' }}
                    />
                </button>

                {/* Avatar */}
                <div className="w-7 h-7 rounded-full overflow-hidden">
                    <Image
                        src={userAvatar}
                        alt="User"
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Hamburger */}
                <button className="p-1.5">
                    <Menu size={20} className="text-gray-600" />
                </button>
            </div>
        </header>
    );
}