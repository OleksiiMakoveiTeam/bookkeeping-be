import { WebSocketServer } from "ws";

let wss = null;

export const setupWebSocket = () => {
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
  if (process.env.NODE_ENV !== "test" && !wss)
    return console.error("❌ WebSocket Server is Not Initialized");

  const message = JSON.stringify({ type: "TASK_COMPLETED", task });

  console.log("📡 Broadcasting Message to Clients:", message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("📨 Sending Message to Client...");
      client.send(message);
    } else {
      console.warn("⚠️ Client is not ready, skipping...");
    }
  });
};
