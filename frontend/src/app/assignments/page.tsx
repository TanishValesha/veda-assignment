'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../../components/layout/AppLayout';
import AssignmentCard from '../../../components/assignment/AssignmentCard';
import { getAllAssignments } from '../../../services/api';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';

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

    useEffect(() => {
        getAllAssignments()
            .then((res) => {
                const data = res.data?.assignments;

                setAssignments(Array.isArray(data) ? data : []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    function handleDelete(id: string) {
        setAssignments((prev) => prev.filter((a) => a._id !== id));
        // API call to delete the assignment
    }

    function formatDate(dateStr: string) {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    }

    const filtered = assignments.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout title="Assignment" showBack>
            <div className="flex items-center gap-4 mb-8 px-8">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Assignments</h1>
                    <p className="text-sm text-gray-400">Manage and create assignments for your classes.</p>
                </div>
            </div>
            <div className="w-full mx-auto mt-10 pb-10">


                {/* Filter + Search Row */}
                <div className="flex items-center justify-between mb-5 gap-4">
                    {/* Filter By */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm text-gray-500 font-medium hover:bg-gray-50 transition-colors"
                        style={{ border: '1px solid #F0F0F0', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}>
                        <SlidersHorizontal size={14} />
                        Filter By
                    </button>

                    {/* Search */}
                    <div className="relative flex-1 max-w-sm ml-auto">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Assignment"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-300 text-gray-600 placeholder:text-gray-300"
                            style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}
                        />
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-sm font-semibold text-gray-700 mb-1">No assignments yet</p>
                        <p className="text-xs text-gray-400 mb-6 max-w-xs">
                            Create your first assignment to start collecting and grading student submissions.
                        </p>
                        <button
                            onClick={() => router.push('/assignments/create')}
                            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Plus size={14} />
                            Create Your First Assignment
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
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

            {/* Floating Create Button */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
                <button
                    onClick={() => router.push('/assignments/create')}
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg"
                >
                    <Plus size={15} />
                    Create Assignment
                </button>
            </div>
        </AppLayout>
    );
}