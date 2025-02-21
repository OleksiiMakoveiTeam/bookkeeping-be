import Task from "../models/task.model.js";

export class TaskService {
  constructor() {
    this.taskModel = Task;
  }

  async getTaskById(taskId) {
    return await this.taskModel.findById(taskId);
  }

  async getTasks() {
    return await this.taskModel.find();
  }

  async createTask(description, duration) {
    if (!description || !duration) {
      throw new Error("Task description and duration are required");
    }

    return await this.taskModel.create({
      description,
      duration,
    });
  }

  async markTaskAsCompleted(taskId) {
    return await this.taskModel.findByIdAndUpdate(
      taskId,
      { completed: true, completedAt: new Date() },
      { new: true },
    );
  }
}
