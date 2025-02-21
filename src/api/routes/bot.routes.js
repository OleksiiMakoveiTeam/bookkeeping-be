import express from "express";
import {
  createBotSchema,
  deleteBotSchema,
} from "../validations/bot.validation.js";
import { BotController } from "../controllers/bot.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const router = express.Router();
const botController = new BotController();

/**
 * @swagger
 * /api/bots:
 *   get:
 *     summary: Get all bots
 *     description: Retrieve a list of all bots
 *     responses:
 *       200:
 *         description: A list of bots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Bot"
 */

router.get("/", asyncHandler(botController.getBots));
/**
 * @swagger
 * /api/bots/{id}:
 *   get:
 *     summary: Get a bot by ID
 *     description: Retrieve a bot by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the bot
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved bot details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Bot"
 *       400:
 *         description: Invalid bot ID format
 *       404:
 *         description: Bot not found
 *       500:
 *         description: Server error
 */

router.get("/:id", asyncHandler(botController.getBot));

/**
 * @swagger
 * /api/bots:
 *   post:
 *     summary: Create a new bot
 *     description: Create a bot with a specified name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Bot"
 */
router.post(
  "/",
  validateRequest(createBotSchema),
  asyncHandler(botController.createBot),
);

/**
 * @swagger
 * /api/bots/{id}:
 *   delete:
 *     summary: Delete a bot by ID
 *     description: Deletes a bot and all associated tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the bot
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bot and associated tasks deleted successfully
 *       400:
 *         description: Invalid bot ID format
 *       404:
 *         description: Bot not found
 *       500:
 *         description: Server error
 */

router.delete(
  "/:id",
  validateRequest(deleteBotSchema),
  asyncHandler(botController.deleteBot),
);

export default router;
