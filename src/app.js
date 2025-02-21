import express from "express";
import cors from "cors";
import botRoutes from "./api/routes/bot.routes.js";
import taskRoutes from "./api/routes/task.routes.js";
import "./config/database.js";
import { startAgenda } from "./config/agenda.js";
import { setupSwagger } from "./config/swaggerConfig.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/bots", botRoutes);
app.use("/api/tasks", taskRoutes);

startAgenda();
setupSwagger(app);

app.get("/", (_req, res) => {
  res.send("📌 Bookkeeping Bot API is Running...");
});

export default app;
