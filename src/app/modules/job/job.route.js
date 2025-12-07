import express from "express";
import Joi from "joi";
import { validateBody } from "../../utils/validate.js";
import { auth } from "../../middlewares/auth.js";
import { createJob, getJobs } from "./job.controller.js";

const router = express.Router();

const jobSchema = Joi.object({
	title: Joi.string().min(3).required(),
	description: Joi.string().allow(""),
	company: Joi.string().allow("")
});

router.post("/", auth("employee"), validateBody(jobSchema), createJob);
router.get("/", getJobs);

export default router;
