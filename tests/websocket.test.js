import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";

describe("WebSocket Server", () => {
  let server;
  let wss;
  let port = 8090;

  const broadcastTaskCompletion = (task) => {
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

  beforeAll((done) => {
    server = createServer();
    wss = new WebSocketServer({ server });

    wss.on("connection", (socket) => {
      console.log("✅ WebSocket client connected");

      socket.on("message", (message) => {
        console.log("✅ Received message from client:", message);
      });
    });

    server.listen(port, () => {
      console.log(`✅ Test WebSocket Server Started on Port ${port}`);
      done();
    });
  });

  afterAll((done) => {
    wss.clients.forEach((client) => client.terminate());
    wss.close(() => {
      server.close(done);
    });
  });

  test("Should receive a task completion update", (done) => {
    const wsClient = new WebSocket(`ws://localhost:${port}`);

    wsClient.on("open", () => {
      console.log("✅ WebSocket Client Connected");

      // ✅ Wait before broadcasting to ensure connection is stable
      setTimeout(() => {
        const taskUpdate = {
          _id: "task123",
          description: "Completed Task",
          completed: true,
          completedAt: new Date().toISOString(),
        };

        console.log("📡 Broadcasting Task Completion...");
        broadcastTaskCompletion(taskUpdate);
      }, 500);
    });

    wsClient.on("message", (msg) => {
      console.log("✅ Received WebSocket Message:", msg);
      const message = JSON.parse(msg);

      expect(message.type).toBe("TASK_COMPLETED");
      expect(message.task).toEqual(
        expect.objectContaining({ description: "Completed Task" }),
      );

      wsClient.close();
    });

    wsClient.on("close", () => {
      console.log("✅ WebSocket Client Disconnected");
      done();
    });

    wsClient.on("error", (err) => {
      console.error("❌ WebSocket Error:", err);
      done(err);
    });
  }, 10000);
});
