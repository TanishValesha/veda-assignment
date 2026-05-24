import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";

interface Client {
  assignmentId: string;
  ws: WebSocket;
}

class WsManager {
  private clients: Map<string, WebSocket> = new Map();

  init(wss: WebSocketServer) {
    wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      // ws://host/ws?assignmentId=xxx
      const url = new URL(req.url || "", `http://localhost`);
      const assignmentId = url.searchParams.get("assignmentId");

      if (!assignmentId) {
        ws.close(1008, "assignmentId required");
        return;
      }

      this.clients.set(assignmentId, ws);
      console.log(`WS client connected: ${assignmentId}`);

      ws.on("close", () => {
        this.clients.delete(assignmentId);
        console.log(`WS client disconnected: ${assignmentId}`);
      });

      ws.send(JSON.stringify({ event: "connected", assignmentId }));
    });
  }

  notify(assignmentId: string, payload: object) {
    const ws = this.clients.get(assignmentId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }
}

export const wsManager = new WsManager();
