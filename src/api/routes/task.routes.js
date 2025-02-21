import express from "express";
import {
  createTaskSchema,
  completeTaskSchema,
} from "../validations/task.validation.js";
import { TaskController } from "../controllers/task.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const router = express.Router();
const taskController = new TaskController();

router.get("/", asyncHandler(taskController.getTasks));
router.post(
  "/",
  validateRequest(createTaskSchema),
  asyncHandler(taskController.createTask),
);
router.patch(
  "/complete",
  validateRequest(completeTaskSchema),
  asyncHandler(taskController.markTaskAsCompleted),
);

export default router;
