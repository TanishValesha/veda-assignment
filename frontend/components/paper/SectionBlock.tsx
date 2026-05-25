import { Section } from '../../types/index';

const DIFFICULTY_LABEL: Record<string, string> = {
    easy: 'Easy',
    moderate: 'Moderate',
    challenging: 'Challenging',
};

interface SectionBlockProps {
    section: Section;
    globalStartIndex: number;
}

export default function SectionBlock({ section, globalStartIndex }: SectionBlockProps) {
    return (
        <div className="mb-8">
            {/* Section Label — bold, large, centered */}
            <h2 className="text-base font-bold text-gray-900 text-center mb-4">
                {section.label}
            </h2>

            {/* Section Title — bold */}
            <p className="text-sm font-bold text-gray-900 mb-1">{section.title}</p>

            {/* Instruction — italic */}
            <p className="text-xs text-gray-600 italic mb-4">{section.instruction}</p>

            {/* Questions */}
            <div className="space-y-2.5">
                {section.questions.map((q, i) => (
                    <div key={q.id} className="text-sm text-gray-900 leading-relaxed flex gap-1.5">
                        <span className="shrink-0">{globalStartIndex + i}.</span>
                        <span>
                            [{DIFFICULTY_LABEL[q.difficulty]}] {q.text}{' '}
                            <span className="font-normal">
                                [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                            </span>

                            {/* MCQ Options */}
                            {q.type === 'mcq' && q.options && q.options.length > 0 && (
                                <div className="mt-1.5 ml-2 space-y-1">
                                    {q.options.map((opt, oi) => (
                                        <div key={oi} className="text-sm text-gray-900">
                                            &nbsp;&nbsp;&nbsp;{String.fromCharCode(65 + oi)}. {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </span>
                    </div>
                ))}
            </div>

            {/* End of Section */}
            <p className="text-sm font-bold text-gray-900 mt-4">End of {section.label}</p>
        </div>
    );
}