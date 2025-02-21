import { z } from "zod";

export const createBotSchema = z.object({
  name: z.string().min(3, "Bot name must be at least 3 characters long"),
});

export const deleteBotSchema = z.object({
  id: z.string(),
});
