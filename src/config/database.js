import { mongoDbUri } from "../utils/consts.js";
import mongoose from "mongoose";

await mongoose
  .connect(mongoDbUri)
  .then(() => {
    console.log("🚀 Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  });
