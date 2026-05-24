'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    function handleFile(file: File) {
        setFileName(file.name);
        onFileSelect(file);
    }

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
            }}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'
                }`}
            onClick={() => inputRef.current?.click()}
        >
            <Upload size={22} className="text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
                {fileName ?? 'Choose a file or drag & drop it here'}
            </p>
            <p className="text-xs text-gray-400">JPEG, PNG, upto 10MB</p>
            <button
                type="button"
                className="mt-1 px-4 py-1.5 text-xs font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            >
                Browse Files
            </button>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
        </div>
    );
}