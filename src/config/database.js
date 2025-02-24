import mongoose from "mongoose";
import { mongoDbUri } from "../utils/consts.js";

const connect = async () => {
  const isTestEnv = process.env.NODE_ENV === "test";

  const mongoUri = isTestEnv ? global.__MONGO_URI__ : mongoDbUri;

  if (!mongoUri) {
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`✅ Connected to ${isTestEnv ? "in-memory" : "real"} MongoDB`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connect;
