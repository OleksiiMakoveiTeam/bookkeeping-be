import { z } from "zod";

export const createTaskSchema = z.object({
  description: z
    .string()
    .min(5, "Task description must be at least 5 characters long"),
  duration: z.number().min(1000, "Duration must be at least 1000ms"),
});

export const completeTaskSchema = z.object({
  taskId: z.string().length(24, "Invalid Task ID format"),
});
