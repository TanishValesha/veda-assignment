'use client';

import { X } from 'lucide-react';
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
        <div className="flex items-center gap-3">
            {/* Type Dropdown */}
            <div className="relative flex-1">
                <select
                    value={config.type}
                    onChange={(e) => onChange({ type: e.target.value as QuestionType })}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white pr-8 focus:outline-none focus:ring-1 focus:ring-orange-400"
                >
                    {QUESTION_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
            </div>

            {/* Remove */}
            {showRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <X size={15} />
                </button>
            )}

            {/* Count */}
            <CounterInput value={config.count} onChange={(val) => onChange({ count: val })} />

            {/* Marks */}
            <CounterInput value={config.marks} onChange={(val) => onChange({ marks: val })} />
        </div>
    );
}