"use client";

import { useEffect, useRef, useCallback } from "react";

interface WsMessage {
  event: string;
  status?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paper?: any;
  pdfUrl?: string;
  assignmentId?: string;
}

interface UseWebSocketProps {
  assignmentId: string | null;
  onMessage: (msg: WsMessage) => void;
  skip?: boolean;
  onConnect?: () => void;
}

export function useWebSocket({
  assignmentId,
  onMessage,
  skip,
  onConnect,
}: UseWebSocketProps) {
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (!assignmentId || skip) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?assignmentId=${assignmentId}`,
    );

    console.log("Connecting to:", ws.url);

    ws.onopen = () => {
      console.log("WS connected");
      onConnect?.();
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        onMessage(data);
      } catch {
        console.error("WS parse error");
      }
    };

    ws.onerror = (e) => console.error("WS error", e);
    ws.onclose = () => console.log("WS disconnected");

    wsRef.current = ws;
  }, [assignmentId, onMessage, skip, onConnect]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);
}
