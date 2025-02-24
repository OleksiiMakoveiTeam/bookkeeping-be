import request from "supertest";
import Bot from "../src/api/models/bot.model.js";
import app from "../src/app.js";

describe("Bot API", () => {
  beforeEach(async () => {
    await Bot.deleteMany({});
  });

  test("Should create a bot", async () => {
    const response = await request(app)
      .post("/api/bots")
      .send({ name: "TestBot" })
      .expect(200);

    expect(response.body.name).toBe("TestBot");
    expect(response.body.tasks.length).toBe(2);
  });

  test("Should fetch all bots", async () => {
    await Bot.create({ name: "Bot1", tasks: [] });
    await Bot.create({ name: "Bot2", tasks: [] });

    const response = await request(app).get("/api/bots").expect(200);

    expect(response.body.length).toBe(2);
  });
});
