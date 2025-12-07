import catchAsync from "../../utils/catchAsync.js";
import Application from "./application.model.js";
import { mockPayment } from "../../utils/mockPayment.js";
import { uploadBuffer } from "../../utils/cloudStorage.js";

export const applyJob = catchAsync(async (req, res) => {
  const { jobId } = req.body;
  if (!req.file) return res.status(400).json({ success: false, message: "CV required" });
  const payment = await mockPayment(100);
  if (!payment.success) return res.status(402).json({ success: false, message: "Payment failed" });
  const existing = await Application.findOne({ job: jobId, applicant: req.user.id });
  if (existing) return res.status(400).json({ success: false, message: "Already applied" });
  // upload cv to configured cloud storage
  const file = req.file;
  let cvUrl;
  if (file && file.buffer) {
    const uploaded = await uploadBuffer(file.buffer, file.originalname, file.mimetype);
    cvUrl = uploaded.url;
  } else {
    return res.status(400).json({ success: false, message: "CV required" });
  }

  const app = await Application.create({
    job: jobId,
    applicant: req.user.id,
    cv: cvUrl,
    paymentStatus: true,
    paymentInfo: payment,
  });
  res.json({ success: true, application: app });
});
