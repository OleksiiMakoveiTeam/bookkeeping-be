import Bot from "../models/bot.model.js";

export class BotService {
  constructor() {
    this.botModel = Bot;
  }

  async getBots() {
    return await this.botModel.find().populate("tasks");
  }

  async createBot(name) {
    if (!name) throw new Error("Bot name is required");
    return await this.botModel.create({ name, tasks: [] });
  }
}
