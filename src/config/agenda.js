import { Agenda } from "agenda";
import { mongoDbUri } from "../utils/consts.js";
import { broadcastTaskCompletion } from "../config/websocket.js";
import Task from "../api/models/task.model.js";
import Bot from "../api/models/bot.model.js";

const isTestEnv = process.env.NODE_ENV === "test";

const agenda = isTestEnv
  ? null
  : new Agenda({
      db: { address: mongoDbUri },
      processEvery: "10 seconds",
    });

if (!isTestEnv) {
  agenda.on("ready", () => console.log("✅ Agenda.js is connected and ready!"));
  agenda.on("error", (error) => console.error("❌ Agenda.js error:", error));

  agenda.define("execute task", async (job) => {
    const { taskId } = job.attrs.data;
    const task = await Task.findById(taskId);

    if (!task || task.completed) return;

    console.log(`⏳ Executing Task: ${task.description}`);

    await new Promise((resolve) => setTimeout(resolve, task.duration));

    task.completed = true;
    task.completedAt = new Date();
    await task.save();

    console.log(`✅ Task Completed: ${task.description}`);

    const bot = await Bot.findOne({ tasks: task._id });

    broadcastTaskCompletion({
      _id: task._id,
      description: task.description,
      botId: bot ? bot._id : null,
      completed: true,
      completedAt: task.completedAt,
    });
  });
}

export async function startAgenda() {
  if (!isTestEnv) {
    await agenda.start();
    console.log("🚀 Agenda.js is running background jobs.");
  }
}

export function scheduleTaskExecution(taskId, duration) {
  if (!isTestEnv) {
    agenda.schedule(new Date(Date.now() + duration), "execute task", {
      taskId,
    });
  }
}

export default agenda;
