'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import uploadIcon from '../../public/icons/upload.png';
import { UploadCloud } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

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
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'
                }`}
        >
            {isMobile ? <UploadCloud size={28} /> : <UploadCloud size={36} />}
            <p className="text-md text-center font-medium text-gray-700">
                {fileName ?? 'Choose a file or drag & drop it here'}
            </p>
            <p className="text-sm text-gray-400">JPEG, PNG, upto 10MB</p>

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                }}
                className="mt-2 px-6 py-2 rounded-full bg-[#f1f1f1] text-gray-700 text-md font-medium hover:bg-[#e9e9e9]
transition-all
  "
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