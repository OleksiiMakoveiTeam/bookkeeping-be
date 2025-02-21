import { BotService } from "../services/bot.service.js";

export class BotController {
  constructor() {
    this.botService = new BotService();
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
    return await this.botService.createBot(name);
  };
}
