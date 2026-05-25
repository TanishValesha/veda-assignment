// QuestionTypeRow.tsx
'use client';

import { ChevronDown, X } from 'lucide-react';
import { QuestionConfig, QuestionType } from '../../types/index';
import CounterInput from './CounterInput';
import { useMediaQuery } from 'react-responsive';

const QUESTION_TYPE_OPTIONS: { label: string; value: QuestionType }[] = [
    { label: 'Multiple Choice Questions', value: 'mcq' },
    { label: 'Short Questions', value: 'short' },
    { label: 'Long Answer Questions', value: 'long' },
    { label: 'Diagram/Graph-Based Questions', value: 'diagram' },
    { label: 'Numerical Problems', value: 'numerical' },
    { label: 'True / False', value: 'true_false' },
];

interface QuestionTypeRowProps {
    config: QuestionConfig;
    onChange: (data: Partial<QuestionConfig>) => void;
    onRemove: () => void;
    showRemove: boolean;
}

export default function QuestionTypeRow({
    config,
    onChange,
    onRemove,
    showRemove,
}: QuestionTypeRowProps) {
    const isMobile = useMediaQuery({
        maxWidth: 768,
    });

    if (isMobile) {
        return (
            <div className="rounded-[28px] bg-[#F5F5F5] p-4 space-y-4">
                {/* Top */}
                <div className="flex items-center gap-3">
                    {/* Select */}
                    <div className="relative flex-1">
                        <select
                            value={config.type}
                            onChange={(e) =>
                                onChange({
                                    type: e.target.value as QuestionType,
                                })
                            }
                            className="w-full appearance-none bg-transparent border-none pr-8 text-sm font-medium text-[#2B2B2B] focus:outline-none"
                        >
                            {QUESTION_TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={18}
                            strokeWidth={2.2}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2B2B2B] pointer-events-none"
                        />
                    </div>

                    {/* Remove */}
                    {showRemove && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="text-[#2B2B2B] active:scale-95 transition-transform"
                        >
                            <X size={20} strokeWidth={2.2} />
                        </button>
                    )}
                </div>

                {/* Counter Section */}
                <div className="rounded-[24px] bg-[#ECECEC] px-4 py-3">
                    <div className="grid grid-cols-2 gap-3">
                        {/* Questions */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-[#3A3A3A] text-center">
                                No. of Questions
                            </p>

                            <CounterInput
                                value={config.count}
                                onChange={(val) =>
                                    onChange({
                                        count: val,
                                    })
                                }
                            />
                        </div>

                        {/* Marks */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-[#3A3A3A] text-center">
                                Marks
                            </p>

                            <CounterInput
                                value={config.marks}
                                onChange={(val) =>
                                    onChange({
                                        marks: val,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-4">
                {/* Dropdown */}
                <div className="relative flex-1">
                    <select
                        value={config.type}
                        onChange={(e) =>
                            onChange({
                                type: e.target.value as QuestionType,
                            })
                        }
                        className="w-full appearance-none bg-[#F5F5F5] border-none rounded-full px-5 py-3 pr-10 text-sm font-medium text-[#2C2C2C] focus:outline-none cursor-pointer"
                    >
                        {QUESTION_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                        <ChevronDown size={16} strokeWidth={2.2} />
                    </span>
                </div>

                {/* Remove Button */}
                {showRemove ? (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-[#666] hover:text-red-500 transition-colors"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                ) : (
                    <div className="w-4" />
                )}

                {/* Counters */}
                <CounterInput
                    value={config.count}
                    onChange={(val) => onChange({ count: val })}
                />

                <CounterInput
                    value={config.marks}
                    onChange={(val) => onChange({ marks: val })}
                />
            </div>
        );
    }
}