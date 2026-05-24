// CounterInput.tsx
'use client';

interface CounterInputProps {
    value: number;
    onChange: (val: number) => void;
    min?: number;
}

export default function CounterInput({
    value,
    onChange,
    min = 1,
}: CounterInputProps) {
    return (
        <div className="flex items-center bg-[#F5F5F5] rounded-full px-2 py-2 min-w-[88px] justify-between">
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full text-[#B0B0B0] hover:bg-white transition-all text-base font-medium"
            >
                −
            </button>

            <span className="text-sm font-medium text-[#2C2C2C] min-w-[18px] text-center">
                {value}
            </span>

            <button
                type="button"
                onClick={() => onChange(value + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-[#B0B0B0] hover:bg-white transition-all text-base font-medium"
            >
                +
            </button>
        </div>
    );
}