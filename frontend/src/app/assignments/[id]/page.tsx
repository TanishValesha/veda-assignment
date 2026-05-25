'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '../../../../components/layout/AppLayout';
import { getQuestionPaper } from '../../../../services/api';
import { useWebSocket } from '../../../../hooks/useWebSocket';
import { Download, Loader2, RefreshCw } from 'lucide-react';

type PageStatus = 'waiting' | 'active' | 'completed' | 'failed';

export default function AssignmentOutputPage() {
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState<PageStatus>('waiting');
    const [message, setMessage] = useState('Waiting for generation to start...');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [subject, setSubject] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [paper, setPaper] = useState<any>(null);

    // on refresh, try fetching existing paper
    useEffect(() => {
        getQuestionPaper(id)
            .then((res) => {
                if (res.data) {
                    setPaper(res.data);
                    setPdfUrl(res.data.pdfUrl || null);
                    setSubject(res.data.subject || '');
                    setGradeLevel(res.data.gradeLevel || '');
                    setStatus('completed');
                }
            })
            .catch(() => {
                // paper not ready yet, WS will handle it
            });
    }, [id]);

    const handleWsMessage = useCallback((msg: any) => {
        if (msg.event === 'status') {
            setStatus('active');
            setMessage(msg.message || 'Generating...');
        }

        if (msg.event === 'completed') {
            setStatus('completed');
            setPdfUrl(msg.pdfUrl || null);
            setSubject(msg.paper?.subject || '');
            setGradeLevel(msg.paper?.gradeLevel || '');
        }

        if (msg.event === 'failed') {
            setStatus('failed');
            setMessage(msg.message || 'Generation failed');
        }
    }, []);

    useWebSocket({ assignmentId: id, onMessage: handleWsMessage, skip: status === 'completed' });

    return (
        <AppLayout title="Create New" showBack>
            <div className="max-w-4xl mx-auto space-y-4">

                {/* Top Banner */}
                {status === 'completed' && pdfUrl && (
                    <div className="bg-gray-900 text-white rounded-2xl px-6 py-4 flex items-start justify-between gap-4">
                        <p className="text-sm leading-relaxed">
                            Certainly! Here are customized Question Paper for your{' '}
                            <span className="font-semibold">{gradeLevel} {subject}</span> classes.
                        </p>

                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex items-center gap-2 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <Download size={13} />
                            Download as PDF
                        </a>
                    </div>
                )}

                {/* Loading */}
                {(status === 'waiting' || status === 'active') && (
                    <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
                        <Loader2 size={32} className="text-orange-500 animate-spin" />
                        <p className="text-sm font-medium text-gray-700">{message}</p>
                        <p className="text-xs text-gray-400">This usually takes 10–20 seconds</p>
                    </div>
                )}

                {/* Failed */}
                {status === 'failed' && (
                    <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-red-500">{message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-medium"
                        >
                            <RefreshCw size={13} />
                            Try Again
                        </button>
                    </div>
                )}

                {/* PDF Viewer */}
                {status === 'completed' && pdfUrl && (
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <iframe
                            src={pdfUrl}
                            className="w-full"
                            style={{ height: '85vh' }}
                            title="Question Paper"
                        />
                    </div>
                )}

            </div>
        </AppLayout >
    );
}