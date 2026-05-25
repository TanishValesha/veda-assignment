'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '../../../../components/layout/AppLayout';
import { getQuestionPaper } from '../../../../services/api';
import { useWebSocket } from '../../../../hooks/useWebSocket';
import { FilePlusCorner, Loader2, RefreshCw } from 'lucide-react';

type PageStatus = 'idle' | 'waiting' | 'active' | 'completed' | 'failed';

export default function AssignmentOutputPage() {
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState<PageStatus>('idle');
    const [message, setMessage] = useState('Waiting for generation to start...');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [subject, setSubject] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [paper, setPaper] = useState<any>(null);
    const [shouldConnectWs, setShouldConnectWs] = useState(false);

    const fetchPaper = useCallback(() => {
        getQuestionPaper(id)
            .then((res) => {
                if (res.data?.pdfUrl) {
                    setPaper(res.data);
                    setPdfUrl(res.data.pdfUrl);
                    setSubject(res.data.subject || '');
                    setGradeLevel(res.data.gradeLevel || '');
                    setStatus('completed');
                }
            })
            .catch(() => { });
    }, [id]);

    // fetch on mount
    useEffect(() => {
        fetchPaper();
    }, [fetchPaper]);

    // Fallback - This ensures even if WS and initial fetch both miss, polling catches it within 4 seconds.
    useEffect(() => {
        if (status === 'completed') return;

        const interval = setInterval(() => {
            fetchPaper();
        }, 4000);

        return () => clearInterval(interval);
    }, [status, fetchPaper]);

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

                    setShouldConnectWs(false);
                } else {
                    setShouldConnectWs(true);
                }
            })
            .catch(() => {
                // only connect WS if paper not found
                setShouldConnectWs(true);
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

    useWebSocket({ assignmentId: id, onMessage: handleWsMessage, skip: !shouldConnectWs, onConnect: fetchPaper });

    return (
        <AppLayout title="Assignment" showBack>
            <div className="w-full mx-auto space-y-4">

                {/* Top Banner */}
                {status === 'completed' && pdfUrl && (
                    <div className="bg-black/90 text-white rounded-2xl px-6 py-4 flex flex-col items-start justify-between gap-4">
                        <p className="text-lg leading-relaxed">
                            Certainly! Here are customized Question Paper for your{' '}
                            <span className="font-semibold">{gradeLevel} {subject}</span> classes.
                        </p>

                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex items-center gap-2 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <FilePlusCorner size={16} />
                            Download as PDF
                        </a>
                    </div>
                )}

                {/* Loading */}
                {(status === 'idle' || status === 'waiting' || status === 'active') && (
                    <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
                        <Loader2 size={32} className="text-orange-500 animate-spin" />
                        <p className="text-sm font-medium text-gray-700">
                            {status === 'idle' ? 'Loading...' : message}
                        </p>
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
                            src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
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