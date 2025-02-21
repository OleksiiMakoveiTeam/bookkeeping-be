import http from "http";
import app from "./app.js";
import { setupWebSocket } from "./config/websocket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
setupWebSocket(server);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
