import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

mongoose.connect(config.db_url, { })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  })
  .catch(err => console.error("DB connection error", err));
