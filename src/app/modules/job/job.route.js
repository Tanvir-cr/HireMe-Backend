import express from "express";
import { auth } from "../../middlewares/auth.js";
import { createJob, getJobs } from "./job.controller.js";

const router = express.Router();

router.post("/", auth("employee"), createJob);
router.get("/", getJobs);

export default router;
