import { scheduleTaskExecution } from "../../config/agenda.js";
import { TaskService } from "../services/task.service.js";

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  getTasks = async () => {
    return await this.taskService.getTasks();
  };

  createTask = async (req) => {
    const { description, duration } = req.body;
    const createdTask = await this.taskService.createTask(
      description,
      duration,
    );

    scheduleTaskExecution(createdTask._id, createdTask.duration);

    return createdTask;
  };
}
