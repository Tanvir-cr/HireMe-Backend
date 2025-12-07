import express from "express";
import cors from "cors";
import router from "./routes/rout.js";
import notFound from "./middlewares/notFound.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount api routes
app.use("/api", router);

// 404
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
