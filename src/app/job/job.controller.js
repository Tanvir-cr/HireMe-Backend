import catchAsync from "../../utils/catchAsync.js";
import { createJobService, listJobs } from "./job.service.js";

export const createJob = catchAsync(async (req, res) => {
  const job = await createJobService({ ...req.body, postedBy: req.user.id });
  res.json({ success: true, job });
});

export const getJobs = catchAsync(async (req, res) => {
  const jobs = await listJobs();
  res.json({ success: true, jobs });
});
