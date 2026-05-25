'use client';

import { useRouter } from 'next/navigation';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AppLayout from '../../../../components/layout/AppLayout';
import FileUpload from '../../../../components/assignment/FileUpload';
import QuestionTypeRow from '../../../../components/assignment/QuestionTypeRow';
import { useAssignmentStore } from '../../../../store/assignmentStore';
import micIcon from '../../../../public/icons/mic.png';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from 'next/navigation';

export default function CreateAssignmentPage() {
    const router = useRouter();
    const {
        form,
        setField,
        addQuestionConfig,
        removeQuestionConfig,
        updateQuestionConfig,
    } = useAssignmentStore();

    const [error, setError] = useState('');
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pathname = usePathname();
    const totalQuestions = form.questionConfig.reduce((s, q) => s + q.count, 0);
    const totalMarks = form.questionConfig.reduce((s, q) => s + q.count * q.marks, 0);

    function handleNext() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(form.dueDate);

        if (!form.dueDate) {
            return setError('Please select a due date');
        }

        if (selectedDate < today) {
            return setError('Due date cannot be in the past');
        }

        if (form.questionConfig.length === 0) {
            return setError('Add at least one question type');
        }

        setError('');

        router.push('/assignments/create/details');
    }

    return (
        <AppLayout title="Assignment" showBack>
            {
                isMobile ? (
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
                            Create Assignments
                        </h1>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 mb-8 px-8">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-5 h-5 rounded-full bg-green-300 opacity-75" />
                            <div className="relative w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Create Assignment</h1>
                            <p className="text-sm text-gray-400">Set up a new assignment for your students</p>
                        </div>
                    </div>)
            }

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
                    <p className="text-md md:text-sm text-gray-400 text-center -mt-3">
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
                                min={new Date().toISOString().split('T')[0]}
                                placeholder="DD-MM-YYYY"
                                className="w-full border border-gray-200 rounded-3xl px-3 py-3 text-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Question Type Header */}
                    {isMobile ? (
                        <div className="flex items-center">
                            <span className="text-md font-semibold text-black">Question Type</span>
                        </div>
                    ) : (
                        <div className="grid items-center" style={{ gridTemplateColumns: '1fr 24px 100px 100px' }}>
                            <span className="text-md font-semibold text-black">Question Type</span>
                            <span />
                            <span className="text-md font-semibold text-black text-center">No. of Questions</span>
                            <span className="text-md font-semibold text-black text-center">Marks</span>
                        </div>)
                    }

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
                        className="flex items-center gap-2 text-sm  font-medium hover:text-gray-900 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-bold">
                            <Plus size={20} className="text-white" />
                        </div>
                        <span className='font-bold'>Add Question Type</span>
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
                <div className="flex justify-center items-center md:justify-between mt-5 gap-2 md:gap-0">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-md md:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}
                    >
                        <ArrowLeft />
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-md md:text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Next<ArrowRight />
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}