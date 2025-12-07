import express from "express";
import userRoutes from "../modules/user/user.route.js";
import jobRoutes from "../modules/job/job.route.js";
import appRoutes from "../modules/application/application.route.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/jobs", jobRoutes);
router.use("/apply", appRoutes);

export default router;
