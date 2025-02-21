import { z } from "zod";

export const createBotSchema = z.object({
  name: z.string().min(3, "Bot name must be at least 3 characters long"),
});

export const assignTaskSchema = z.object({
  botId: z.string().length(24, "Invalid Bot ID format"),
  taskId: z.string().length(24, "Invalid Task ID format"),
});
