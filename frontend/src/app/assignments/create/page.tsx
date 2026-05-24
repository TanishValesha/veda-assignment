'use client';

import { useRouter } from 'next/navigation';
import { Plus, Mic, Calendar } from 'lucide-react';
import AppLayout from '../../../../components/layout/AppLayout';
import FileUpload from '../../../../components/assignment/FileUpload';
import QuestionTypeRow from '../../../../components/assignment/QuestionTypeRow';
import { useAssignmentStore } from '../../../../store/assignmentStore';

export default function CreateAssignmentPage() {
    const router = useRouter();
    const {
        form,
        setField,
        addQuestionConfig,
        removeQuestionConfig,
        updateQuestionConfig,
    } = useAssignmentStore();

    const totalQuestions = form.questionConfig.reduce((s, q) => s + q.count, 0);
    const totalMarks = form.questionConfig.reduce((s, q) => s + q.count * q.marks, 0);

    function handleNext() {
        // basic validation
        if (!form.dueDate) return alert('Please select a due date');
        if (form.questionConfig.length === 0) return alert('Add at least one question type');
        router.push('/assignments/create/details');
    }

    return (
        <AppLayout title="Assignment" showBack>
            <div className="max-w-4xl mx-auto">
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
                    <div className="h-1 bg-gray-800 rounded-full w-1/2" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">

                    {/* Assignment Details Header */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Assignment Details</h2>
                        <p className="text-xs text-gray-400">Basic information about your assignment</p>
                    </div>

                    {/* File Upload */}
                    <FileUpload onFileSelect={(file) => console.log(file)} />
                    <p className="text-xs text-gray-400 text-center -mt-4">
                        Upload images of your preferred document/image
                    </p>

                    {/* Due Date */}
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Due Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={(e) => setField('dueDate', e.target.value)}
                                placeholder="DD-MM-YYYY"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 pr-10"
                            />
                            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Question Types Header */}
                    <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center">
                        <span className="text-xs font-medium text-gray-600">Question Type</span>
                        <span className="text-xs font-medium text-gray-600 w-24 text-center">No. of Questions</span>
                        <span className="text-xs font-medium text-gray-600 w-24 text-center">Marks</span>
                    </div>

                    {/* Question Type Rows */}
                    <div className="space-y-3">
                        {form.questionConfig.map((config, index) => (
                            <QuestionTypeRow
                                key={index}
                                config={config}
                                onChange={(data) => updateQuestionConfig(index, data)}
                                onRemove={() => removeQuestionConfig(index)}
                                showRemove={form.questionConfig.length > 1}
                            />
                        ))}
                    </div>

                    {/* Add Question Type */}
                    <button
                        type="button"
                        onClick={addQuestionConfig}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                            <Plus size={13} className="text-white" />
                        </div>
                        Add Question Type
                    </button>

                    {/* Totals */}
                    <div className="text-right space-y-0.5">
                        <p className="text-xs text-gray-500">Total Questions : <span className="font-semibold text-gray-800">{totalQuestions}</span></p>
                        <p className="text-xs text-gray-500">Total Marks : <span className="font-semibold text-gray-800">{totalMarks}</span></p>
                    </div>

                    {/* Additional Instructions */}
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                            Additional Information <span className="text-gray-400">(For better output)</span>
                        </label>
                        <div className="relative">
                            <textarea
                                value={form.additionalInstructions}
                                onChange={(e) => setField('additionalInstructions', e.target.value)}
                                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 resize-none pr-10"
                            />
                            <Mic size={16} className="absolute right-3 bottom-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
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
                        onClick={handleNext}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}