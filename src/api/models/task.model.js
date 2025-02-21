import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - description
 *         - duration
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         description:
 *           type: string
 *           description: Description of the task
 *         duration:
 *           type: integer
 *           description: Time in milliseconds before the task is completed
 *         completed:
 *           type: boolean
 *           description: Indicates whether the task is completed
 *         completedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the task was completed
 *       example:
 *         _id: "65123def456abc7890123456"
 *         description: "Process Invoice"
 *         duration: 1500
 *         completed: false
 *         completedAt: null
 */

const taskSchema = new Schema(
  {
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

const Task = model("Task", taskSchema);

export default Task;
