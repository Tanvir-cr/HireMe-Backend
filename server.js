import mongoose from "mongoose";
import app from "./src/app/app.js";
import config from "./src/app/config/index.js";
import { MongoMemoryServer } from "mongodb-memory-server";

async function start() {
  let mongoUri = config.db_url;
  try {
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB connected", mongoUri);
  } catch (err) {
    console.error("DB connection error", err);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    
    try {
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri, {});
      console.log("Started in-memory MongoDB at", mongoUri);
    } catch (memErr) {
      console.error("Failed to start in-memory MongoDB", memErr);
      process.exit(1);
    }
  }

  app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
}

start().catch((e) => console.error(e));
