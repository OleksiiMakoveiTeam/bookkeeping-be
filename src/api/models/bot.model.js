import { model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Bot:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the bot
 *         name:
 *           type: string
 *           description: The name of the bot
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             description: List of task IDs assigned to the bot
 *       example:
 *         _id: "65123abc456def7890123456"
 *         name: "CharlieBot"
 *         tasks: ["65123def456abc7890123456"]
 */
const botSchema = new Schema(
  {
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true },
);

const Bot = model("Bot", botSchema);

export default Bot;
