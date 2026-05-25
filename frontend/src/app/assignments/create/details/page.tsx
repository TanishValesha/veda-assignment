'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../../../../components/layout/AppLayout';
import { useAssignmentStore } from '../../../../../store/assignmentStore';
import { createAssignment } from '../../../../../services/api';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

const GRADE_OPTIONS = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12',
];

const SUBJECT_OPTIONS = [
    'Mathematics', 'Science', 'English',
    'Social Studies', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Computer Science',
];

export default function AssignmentDetailsPage() {
    const router = useRouter();
    const { form, setField, reset } = useAssignmentStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit() {
        if (!form.title.trim()) return setError('Title is required');
        if (!form.subject) return setError('Subject is required');
        if (!form.gradeLevel) return setError('Grade level is required');

        setLoading(true);
        setError('');

        try {
            const res = await createAssignment(form);
            const assignmentId = res.data.assignmentId;
            reset();
            router.push(`/assignments/${assignmentId}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout title="Assignment" showBack>
            {/* Page Title */}
            <div className="flex items-center gap-2 mb-8 px-8">
                <div className="flex items-center gap-4 mb-8 px-8">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-5 h-5 rounded-full bg-green-300 opacity-75" />
                        <div className="relative w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Create Assignment</h1>
                        <p className="text-sm text-gray-400">Set up a new assignment for your students</p>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-10 pb-10">


                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
                    <div className="h-1 bg-gray-800 rounded-full w-full transition-all" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Assignment Information</h2>
                        <p className="text-sm text-gray-400">Tell us more about this assignment</p>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-md font-medium text-black mb-1.5 block">
                            Assignment Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setField('title', e.target.value)}
                            placeholder="e.g Delhi Public School - Science Test"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="text-md font-medium text-black mb-1.5 block">
                            Subject
                        </label>
                        <div className="relative">
                            <select
                                value={form.subject}
                                onChange={(e) => setField('subject', e.target.value)}
                                className="w-full appearance-none bg-[#F5F5F5] border-none rounded-full px-5 py-3 pr-10 text-sm font-medium text-[#2C2C2C] focus:outline-none cursor-pointer"
                            >
                                <option value="">Select Subject</option>
                                {SUBJECT_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                <ChevronDown size={16} strokeWidth={2.2} />
                            </span>
                        </div>
                    </div>

                    {/* Grade Level */}
                    <div>
                        <label className="text-md font-medium text-black mb-1.5 block">
                            Grade Level
                        </label>
                        <div className="relative">
                            <select
                                value={form.gradeLevel}
                                onChange={(e) => setField('gradeLevel', e.target.value)}
                                className="w-full appearance-none bg-[#F5F5F5] border-none rounded-full px-5 py-3 pr-10 text-sm font-medium text-[#2C2C2C] focus:outline-none cursor-pointer"
                            >
                                <option value="">Select Grade</option>
                                {GRADE_OPTIONS.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                <ChevronDown size={16} strokeWidth={2.2} />
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex items-start gap-3 mt-4 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                        <div>
                            <p className="text-sm font-semibold text-red-700">
                                Validation Error
                            </p>
                            <p className="mt-0.5 text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}
                    >
                        <ArrowLeft /> Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Next'}<ArrowRight />
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}