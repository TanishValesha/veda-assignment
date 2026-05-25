'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppLayout from '../../../components/layout/AppLayout';
import AssignmentCard from '../../../components/assignment/AssignmentCard';
import { deleteAssignment, getAllAssignments } from '../../../services/api';
import { Search, SlidersHorizontal, Plus, Funnel, Loader2, ArrowLeft } from 'lucide-react';
import NoAssignment from '../../../components/assignment/NoAssignment';
import { useAssignmentStore } from '../../../store/assignmentStore';
import { toast } from "sonner";
import { useMediaQuery } from "react-responsive";

interface Assignment {
    _id: string;
    title: string;
    createdAt: string;
    dueDate: string;
    status: string;
}

export default function AssignmentsPage() {
    const router = useRouter();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const isMobile = useMediaQuery({
        maxWidth: 768,
    });

    const setAssignmentsCount = useAssignmentStore(
        (s) => s.setAssignmentsCount
    );

    useEffect(() => {
        getAllAssignments()
            .then((res) => {
                const data = res.data?.assignments;

                setAssignments(Array.isArray(data) ? data : []);
                setAssignmentsCount(data.length);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(id: string) {
        try {
            await deleteAssignment(id);
            setAssignments((prev) => prev.filter((a) => a._id !== id));
            toast.success("Assignment deleted successfully", {
                description: "The document has been removed permanently.",
            });
        } catch {
            toast.error("Failed to delete assignment", {
                description: "Something went wrong. Please try again.",
            });
        }
    }

    function formatDate(dateStr: string) {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    }

    const filtered = assignments.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout title="Assignment">
            {assignments.length !== 0 && !loading && (
                isMobile ? (
                    /* Mobile Header */
                    <div className="flex items-center justify-center relative mb-6 px-4 pt-2">
                        {/* Back Button */}
                        {pathname !== "/" && pathname !== "/assignments" && (
                            <button
                                onClick={() => router.back()}
                                className="absolute left-0 w-10 h-10 rounded-full bg-[#F3F3F3] flex items-center justify-center transition-transform active:scale-95"
                            >
                                <ArrowLeft size={24} className="text-black" />
                            </button>
                        )}

                        {/* Title */}
                        <h1 className="text-[18px] font-semibold text-[#222]">
                            Assignments
                        </h1>
                    </div>
                ) : (
                    /* Desktop Header */
                    <div className="flex items-center gap-4 mb-8 px-8">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-5 h-5 rounded-full bg-green-300 opacity-75 animate-ping" />
                            <div className="relative w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Assignments
                            </h1>
                            <p className="text-sm text-gray-400">
                                Manage and create assignments for your classes.
                            </p>
                        </div>
                    </div>
                )
            )}

            <div className="w-full mx-auto mt-10 pb-10">


                {/* Filter + Search Row */}
                {assignments.length !== 0 && !loading && (
                    <div className="flex items-center justify-between gap-4 w-full px-2 py-4 rounded-[22px] bg-white border border-[#ECECEC] mb-5">

                        {/* Filter Button */}
                        <button className="flex items-center gap-2 h-11 px-4 rounded-2xl text-sm md:text-md font-medium text-[#9A9A9A] hover:bg-white transition-colors">
                            <Funnel size={20} />
                            Filter
                        </button>

                        {/* Search Input Container */}
                        <div className="relative w-full max-w-[420px]">
                            <Search
                                size={20}
                                strokeWidth={1.8}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A8A8]"
                            />
                            <input
                                type="text"
                                placeholder="Search Assignment"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 rounded-full border border-[#DCDCDC] bg-white text-[14px] text-[#444] placeholder:text-[#A8A8A8] outline-none focus:border-[#CFCFCF] focus:ring-0 transition-all"
                            />
                        </div>

                    </div>
                )}

                {/* Grid */}
                {loading ? (
                    <div className="flex h-screen pb-20 text-center justify-center items-center">
                        <Loader2 size={48} className="text-[#FF7A3D] animate-spin" />
                    </div>
                ) : assignments.length === 0 ? (
                    <NoAssignment />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filtered.map((a) => (
                            <AssignmentCard
                                key={a._id}
                                id={a._id}
                                title={a.title}
                                assignedOn={formatDate(a.createdAt)}
                                dueDate={formatDate(a.dueDate)}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {!isMobile && <div className="bottom-fade" />}

            {!isMobile && assignments.length !== 0 && !loading && (
                <div className="fixed bottom-6 left-[calc(50%+120px)] -translate-x-1/2 z-120">
                    <button
                        onClick={() => router.push('/assignments/create')}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold transition-all shadow-lg cursor-pointer hover:scale-105"
                    >
                        <Plus size={24} />
                        Create Assignment
                    </button>
                </div>
            )}

        </AppLayout>
    );
}