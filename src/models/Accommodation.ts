import mongoose, { Schema, models, model } from "mongoose";

const AccommodationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    college: {                 // ✅ Added
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    days: {
      type: Number,
      required: true,
      min: 1,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    utr: {
      type: String,
      required: true,
      trim: true,
    },

    paid: {
      type: Boolean,
      default: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate accommodation per user
AccommodationSchema.index(
  { userId: 1 },
  { unique: true }
);

export const Accommodation =
  models.Accommodation || model("Accommodation", AccommodationSchema);
