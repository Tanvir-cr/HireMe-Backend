import express from "express";
import { register, login, listUsers } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth("admin"), listUsers);

export default router;
