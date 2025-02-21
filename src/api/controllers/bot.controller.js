import { scheduleTaskExecution } from "../../config/agenda.js";
import { BotService } from "../services/bot.service.js";
import { TaskService } from "../services/task.service.js";

export class BotController {
  constructor() {
    this.botService = new BotService();
    this.taskService = new TaskService();
  }

  getBot = async (req) => {
    const { id } = req.params;
    return await this.botService.getBot(id);
  };
  getBots = async () => {
    return await this.botService.getBots();
  };

  createBot = async (req) => {
    const { name } = req.body;
    const bot = await this.botService.createBot(name);

    bot.tasks.forEach(async (task) => {
      const foundTask = await this.taskService.getTaskById(task._id);

      scheduleTaskExecution(foundTask._id, foundTask.duration);
    });

    return bot;
  };

  deleteBot = async (req) => {
    const { id } = req.params;
    return await this.botService.deleteBot(id);
  };
}
