import Image from 'next/image';
import noAssignments from '../../public/Illustrations.png';
import Link from 'next/link';
import { Plus } from 'lucide-react';


export default function NoAssignment() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {/* Illustration */}
            <Image
                src={noAssignments}
                alt="No assignments"
                width={300}
                height={300}
                className="mb-8"
            />

            {/* Text */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">No assignments yet</h2>
            <p className="text-md text-gray-400 max-w-lg leading-relaxed mb-8">
                Create your first assignment to start collecting and grading student
                submissions. You can set up rubrics, define marking criteria, and let AI
                assist with grading.
            </p>

            {/* CTA */}
            <Link href="/assignments/create">
                <button className="flex items-center cursor-pointer hover:scale-102 transition-all gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-md font-medium active:scale-[0.98] duration-500">
                    <Plus size={20} className='font-extrabold' />
                    Create Your First Assignment
                </button>
            </Link>
        </div>
    );

}