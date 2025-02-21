import { Agenda } from "agenda";
import { mongoDbUri } from "../utils/consts.js";
import { broadcastTaskCompletion } from "../config/websocket.js";
import Task from "../api/models/task.model.js";
import Bot from "../api/models/bot.model.js";

const agenda = new Agenda({
  db: { address: mongoDbUri },
  processEvery: "10 seconds",
});

agenda.on("ready", () => console.log("Agenda.js is connected and ready!"));
agenda.on("error", (error) => console.error("Agenda.js error:", error));

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

  // small hack to get the bot id here, i could put it from the controller in a more elegant way
  const bot = await Bot.findOne({ tasks: task._id });

  // Sending message to the client
  broadcastTaskCompletion({
    _id: task._id,
    description: task.description,
    botId: bot ? bot._id : null,
    completed: true,
    completedAt: task.completedAt,
  });
});

export async function startAgenda() {
  await agenda.start();
  console.log("🚀 Agenda.js is running background jobs.");
}

export function scheduleTaskExecution(taskId, duration) {
  agenda.schedule(new Date(Date.now() + duration), "execute task", { taskId });
}

export default agenda;
