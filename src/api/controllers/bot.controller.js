import { BotService } from "../services/bot.service.js";

export class BotController {
  constructor() {
    this.botService = new BotService();
  }

  getBots = async () => {
    return await this.botService.getBots();
  };

  createBot = async (req) => {
    const { name } = req.body;
    return await this.botService.createBot(name);
  };
}
