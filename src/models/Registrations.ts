import mongoose, { Schema, models, model } from "mongoose";

const RegistrationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventTitle: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,   // ✅ no enum
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    utr: {
      type: String,
      required: true,
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

RegistrationSchema.index(
  { userId: 1, eventTitle: 1, eventType: 1 },
  { unique: true }
);

export const Registration =
  models.Registration || model("Registration", RegistrationSchema);