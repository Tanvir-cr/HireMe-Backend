import mongoose from "mongoose";
import app from "./src/app/app.js";
import config from "./src/app/config/index.js";

mongoose.connect(config.db_url, { })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  })
  .catch(err => console.error("DB connection error", err));
