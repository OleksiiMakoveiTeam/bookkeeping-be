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
 *             $ref: "#/components/schemas/Task"
 *           description: List of assigned tasks
 *       example:
 *         _id: "65123abc456def7890123456"
 *         name: "CharlieBot"
 *         tasks:
 *           - _id: "65123def456abc7890123456"
 *             description: "Process Invoice"
 *             duration: 1500
 *             completed: false
 *             completedAt: null
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
