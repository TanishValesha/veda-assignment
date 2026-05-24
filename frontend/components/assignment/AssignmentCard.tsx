'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';

interface AssignmentCardProps {
    id: string;
    title: string;
    assignedOn: string;
    dueDate: string;
    onDelete: (id: string) => void;
}

export default function AssignmentCard({
    id,
    title,
    assignedOn,
    dueDate,
    onDelete,
}: AssignmentCardProps) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            className="bg-white rounded-2xl px-5 py-4 flex flex-col justify-between relative"
            style={{
                boxShadow: '0 1px 8px 0 rgba(0,0,0,0.06)',
                border: '1px solid #F0F0F0',
                minHeight: '162px',
            }}
        >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 leading-snug flex-1 pr-2">
                    {title}
                </h3>

                {/* Three dots menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        className="p-1 rounded-lg hover:bg-gray-50 transition-colors text-gray-400"
                    >
                        <MoreVertical size={16} />
                    </button>

                    {menuOpen && (
                        <div
                            className="absolute right-0 top-7 bg-white rounded-xl overflow-hidden z-20"
                            style={{
                                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                                border: '1px solid #F0F0F0',
                                minWidth: '150px',
                            }}
                        >
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    router.push(`/assignments/${id}`);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                View Assignment
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    onDelete(id);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
                <p className="text-md text-gray-400">
                    <span className="font-bold text-black">Assigned on</span> : {assignedOn}
                </p>
                <p className="text-md text-gray-400">
                    <span className="font-bold text-black">Due</span> : {dueDate}
                </p>
            </div>
        </div>
    );
}