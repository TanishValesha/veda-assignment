'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../../../../components/layout/AppLayout';
import { useAssignmentStore } from '../../../../../store/assignmentStore';
import { createAssignment } from '../../../../../services/api';

const GRADE_OPTIONS = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12',
];

const SUBJECT_OPTIONS = [
    'Mathematics', 'Science', 'English', 'Hindi',
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
            <div className="max-w-2xl mx-auto">

                {/* Page Title */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div>
                        <h1 className="text-base font-semibold text-gray-900">Create Assignment</h1>
                        <p className="text-xs text-gray-400">Set up a new assignment for your students</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
                    <div className="h-1 bg-gray-800 rounded-full w-full transition-all" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">

                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Assignment Information</h2>
                        <p className="text-xs text-gray-400">Tell us more about this assignment</p>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
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
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                            Subject
                        </label>
                        <div className="relative">
                            <select
                                value={form.subject}
                                onChange={(e) => setField('subject', e.target.value)}
                                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 pr-8"
                            >
                                <option value="">Select Subject</option>
                                {SUBJECT_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                        </div>
                    </div>

                    {/* Grade Level */}
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                            Grade Level
                        </label>
                        <div className="relative">
                            <select
                                value={form.gradeLevel}
                                onChange={(e) => setField('gradeLevel', e.target.value)}
                                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 pr-8"
                            >
                                <option value="">Select Grade</option>
                                {GRADE_OPTIONS.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        ← Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Next →'}
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}