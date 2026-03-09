import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: Number, required: true }, // 1 or 2
    status: { type: String, enum: ["Present", "Absent"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);