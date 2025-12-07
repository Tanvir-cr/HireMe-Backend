import express from "express";
import multer from "multer";
import { auth } from "../../middlewares/auth.js";
import { applyJob } from "./application.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const time = Date.now();
    cb(null, time + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
    if (!allowed.includes(file.mimetype)) return cb(new Error("Invalid file type"), false);
    cb(null, true);
  },
});

router.post("/", auth("jobseeker"), upload.single("cv"), applyJob);

export default router;
