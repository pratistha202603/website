import mongoose, { Schema, models, model } from "mongoose";


if (mongoose.models.Accommodation) {
  delete mongoose.models.Accommodation;
}


const AccommodationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    college: { type: String, required: true },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    days: { type: Number, required: true },
    amount: { type: Number, required: true },
    utr: { type: String, required: true },
  },
  { timestamps: true }
);

export const Accommodation =
  models.Accommodation || model("Accommodation", AccommodationSchema);
