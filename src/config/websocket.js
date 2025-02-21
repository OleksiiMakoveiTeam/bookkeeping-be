import { WebSocketServer } from "ws";

let wss;

export const setupWebSocket = (server) => {
  wss = new WebSocketServer({ port: 8080 });
  console.log("WebSocket Server is running");

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

export const broadcastTaskCompletion = (task) => {
  if (!wss) return;

  const message = JSON.stringify({ type: "TASK_COMPLETED", task });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });

  console.log("WebSocket: Sent task completion notification", message);
};
