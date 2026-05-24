'use client';

interface CounterInputProps {
    value: number;
    onChange: (val: number) => void;
    min?: number;
}

export default function CounterInput({ value, onChange, min = 1 }: CounterInputProps) {
    return (
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button
                type="button"
                className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
                onClick={() => onChange(Math.max(min, value - 1))}
            >
                −
            </button>
            <span className="px-3 py-1.5 text-sm font-medium text-gray-800 min-w-[32px] text-center border-x border-gray-200">
                {value}
            </span>
            <button
                type="button"
                className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
                onClick={() => onChange(value + 1)}
            >
                +
            </button>
        </div>
    );
}