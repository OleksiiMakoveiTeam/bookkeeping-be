import express from "express";
import { createBotSchema } from "../validations/bot.validation.js";
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

export default router;
