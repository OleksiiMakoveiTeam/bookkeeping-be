import request from "supertest";
import Task from "../src/api/models/task.model.js";
import app from "../src/app.js";

describe("Task API", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  test("Should create a task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ description: "New Task", duration: 5000 })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: "New Task",
        duration: 5000,
        completed: false,
        completedAt: null,
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
