import Job from "./job.model.js";

export const createJobService = async (data) => {
  return await Job.create(data);
};

export const listJobs = async () => {
  return await Job.find().populate("postedBy", "name email");
};
