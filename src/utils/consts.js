import "dotenv/config";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB_NAME,
  MONGO_OPTIONS,
} = process.env;

const mongoDbUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?${MONGO_OPTIONS}`;

export { MONGO_DB_NAME, mongoDbUri };
