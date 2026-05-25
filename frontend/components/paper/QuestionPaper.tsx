import { GeneratedPaper } from '../../types/index';
import SectionBlock from './SectionBlock';

interface QuestionPaperProps {
    paper: GeneratedPaper;
}

export default function QuestionPaper({ paper }: QuestionPaperProps) {
    const sectionsWithStartIndex = paper.sections.reduce<
        Array<{ section: GeneratedPaper['sections'][number]; startIndex: number }>
    >((acc, section) => {
        const previous = acc[acc.length - 1];
        const startIndex = previous ? previous.startIndex + previous.section.questions.length : 1;
        acc.push({ section, startIndex });
        return acc;
    }, []);

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-10"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* Title */}
            <div className="text-center mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{paper.title}</h1>
            </div>

            {/* Subject + Class — bold like PDF */}
            <div className="text-center mb-6">
                <p className="text-xl font-medium text-gray-900">Subject: {paper.subject}</p>
                <p className="text-xl font-medium text-gray-900">Class: {paper.gradeLevel}</p>
            </div>

            {/* Time + Marks */}
            <div className="flex justify-between text-sm text-gray-900 mb-6">
                <span>Time Allowed: {paper.timeAllowed}</span>
                <span>Maximum Marks: {paper.totalMarks}</span>
            </div>

            {/* General Instruction */}
            <p className="text-sm text-gray-900 mb-6">
                All questions are compulsory unless stated otherwise.
            </p>

            {/* Student Info */}
            <div className="space-y-2 mb-8 text-sm text-gray-900">
                <div className="flex items-end gap-1">
                    <span>Name:</span>
                    <span className="border-b border-gray-700 w-48 inline-block ml-1" />
                </div>
                <div className="flex items-end gap-1">
                    <span>Roll Number:</span>
                    <span className="border-b border-gray-700 w-36 inline-block ml-1" />
                </div>
                <div className="flex items-end gap-1">
                    <span>Class: {paper.gradeLevel} Section:</span>
                    <span className="border-b border-gray-700 w-20 inline-block ml-1" />
                </div>
            </div>

            {/* Sections */}
            {sectionsWithStartIndex.map(({ section, startIndex }) => {
                return (
                    <SectionBlock
                        key={section.label}
                        section={section}
                        globalStartIndex={startIndex}
                    />
                );
            })}

            {/* End of Question Paper */}
            <p className="text-sm font-bold text-gray-900 mt-2">End of Question Paper</p>

            {/* Answer Key — new section like new page in PDF */}
            <div className="mt-10 pt-8 border-t border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-4">Answer Key</h2>
                <div className="space-y-3">
                    {(() => {
                        let idx = 1;
                        return paper.sections.flatMap((section) =>
                            section.questions
                                .filter((q) => q.answer)
                                .map((q) => (
                                    <div key={q.id} className="text-sm text-gray-800 leading-relaxed flex gap-1.5">
                                        <span className="shrink-0 font-bold">{idx++}.</span>
                                        <span className="font-normal">{q.answer}</span>
                                    </div>
                                ))
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}