'use client';

import { useRouter } from 'next/navigation';
import { Plus, Mic, Calendar, ChevronLast, ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AppLayout from '../../../../components/layout/AppLayout';
import FileUpload from '../../../../components/assignment/FileUpload';
import QuestionTypeRow from '../../../../components/assignment/QuestionTypeRow';
import { useAssignmentStore } from '../../../../store/assignmentStore';
import calendarIcon from '../../../../public/icons/calendar.png';
import micIcon from '../../../../public/icons/mic.png';

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
        if (!form.dueDate) return alert('Please select a due date');
        if (form.questionConfig.length === 0) return alert('Add at least one question type');
        router.push('/assignments/create/details');
    }

    return (
        <AppLayout title="Assignment" showBack>
            <div className="flex items-center gap-4 mb-8 px-8">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Create Assignment</h1>
                    <p className="text-sm text-gray-400">Set up a new assignment for your students</p>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-10 pb-10">


                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-200 rounded-full mb-5">
                    <div className="h-1 bg-gray-700 rounded-full w-1/2" />
                </div>

                {/* Main Card */}
                <div
                    className="bg-white rounded-2xl p-6 space-y-5"
                    style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
                >
                    {/* Header */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Assignment Details</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Basic information about your assignment</p>
                    </div>

                    {/* File Upload */}
                    <FileUpload onFileSelect={(file) => console.log(file)} />
                    <p className="text-sm text-gray-400 text-center -mt-3">
                        Upload images of your preferred document/image
                    </p>

                    {/* Due Date */}
                    <div>
                        <label className="text-md font-semibold text-black mb-1.5 block">Due Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={(e) => setField('dueDate', e.target.value)}
                                placeholder="DD-MM-YYYY"
                                className="w-full border border-gray-200 rounded-3xl px-3 py-3 text-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Question Type Header */}
                    <div className="grid items-center" style={{ gridTemplateColumns: '1fr 24px 100px 100px' }}>
                        <span className="text-md font-semibold text-black">Question Type</span>
                        <span />
                        <span className="text-md font-semibold text-black text-center">No. of Questions</span>
                        <span className="text-md font-semibold text-black text-center">Marks</span>
                    </div>

                    {/* Question Rows */}
                    <div className="space-y-2.5">
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
                        className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-bold">
                            <Plus size={20} className="text-white" />
                        </div>
                        Add Question Type
                    </button>

                    {/* Totals */}
                    <div className="text-right space-y-0.5">
                        <p className="text-md text-black">
                            Total Questions : <span className="text-black">{totalQuestions}</span>
                        </p>
                        <p className="text-md text-black">
                            Total Marks : <span className="text-black">{totalMarks}</span>
                        </p>
                    </div>

                    {/* Additional Instructions */}
                    <div>
                        <label className="text-md font-semibold text-black mb-1.5 block">
                            Additional Information{' '}
                            <span className="text-black font-bold">(For better output)</span>
                        </label>
                        <div className="relative">
                            <textarea
                                value={form.additionalInstructions}
                                onChange={(e) => setField('additionalInstructions', e.target.value)}
                                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                                rows={5}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-orange-300 resize-none pr-10"
                            />
                            <div className="absolute right-8 bottom-8">
                                <Image src={micIcon} alt="mic" width={18} height={18} className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-5">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}
                    >
                        <ArrowLeft />
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Next<ArrowRight />
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}