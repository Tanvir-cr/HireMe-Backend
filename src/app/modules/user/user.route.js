import express from "express";
import Joi from "joi";
import { validateBody } from "../../utils/validate.js";
import { register, login, listUsers } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

const registerSchema = Joi.object({
	name: Joi.string().min(2).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	role: Joi.string().valid("admin", "employee", "jobseeker").required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/", auth("admin"), listUsers);

export default router;
