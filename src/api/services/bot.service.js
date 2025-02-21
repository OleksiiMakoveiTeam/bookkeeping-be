import { TASKS } from "../../data/tasks.js";
import Bot from "../models/bot.model.js";
import Task from "../models/task.model.js";

export class BotService {
  constructor() {
    this.botModel = Bot;
    this.taskModel = Task;
  }

  async getBot(id) {
    return await this.botModel.findById(id).populate("tasks");
  }

  async getBots() {
    return await this.botModel.find().populate("tasks");
  }

  async createBot(name) {
    if (!name) throw new Error("Bot name is required");

    const selectedTasks = TASKS.sort(() => 0.5 - Math.random()).slice(0, 2);

    const createdTasks = await this.taskModel.insertMany(selectedTasks);
    const taskIds = createdTasks.map((task) => task._id);

    const bot = await Bot.create({ name, tasks: taskIds });

    return await Bot.findById(bot._id).populate("tasks");
  }
}
