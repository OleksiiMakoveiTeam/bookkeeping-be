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

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks, including their status (completed/pending)
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 */
router.get("/", asyncHandler(taskController.getTasks));

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with a predefined description and duration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Process Invoice"
 *                 description: The task description
 *               duration:
 *                 type: integer
 *                 example: 1500
 *                 description: The duration in milliseconds before task completion
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       400:
 *         description: Invalid request format
 */
router.post(
  "/",
  validateRequest(createTaskSchema),
  asyncHandler(taskController.createTask),
);

/**
 * @swagger
 * /api/tasks/complete:
 *   patch:
 *     summary: Mark a task as completed
 *     description: Updates a task's status to completed based on its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "65123def456abc7890123456"
 *                 description: The ID of the task to be marked as completed
 *     responses:
 *       200:
 *         description: Task marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       400:
 *         description: Invalid task ID or task already completed
 *       404:
 *         description: Task not found
 */
router.patch(
  "/complete",
  validateRequest(completeTaskSchema),
  asyncHandler(taskController.markTaskAsCompleted),
);

export default router;
