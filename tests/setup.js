import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  global.__MONGO_URI__ = mongoServer.getUri();

  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
