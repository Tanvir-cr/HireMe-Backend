import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cv: String,
    paymentStatus: Boolean,
    paymentInfo: Object,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", appSchema);
