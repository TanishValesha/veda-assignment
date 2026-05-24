// QuestionTypeRow.tsx
'use client';

import { ChevronDown, X } from 'lucide-react';
import { QuestionConfig, QuestionType } from '../../types/index';
import CounterInput from './CounterInput';

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