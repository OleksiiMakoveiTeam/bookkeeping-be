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

export default router;
