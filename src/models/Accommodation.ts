import { Schema, models, model } from "mongoose";

const AccommodationSchema = new Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    college: { type: String, required: true },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    days: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Accommodation =
  models.Accommodation || model("Accommodation", AccommodationSchema);
