import mongoose, { Schema, models, model } from "mongoose";

const RegistrationSchema = new Schema(
  {
    // 🔹 Link with User collection
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    utr: { type: String, required: true },

    paid: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },

    eventTitle: { type: String, required: true },

    eventType: {
      type: String,
      enum: ["technical", "nontechnical", "workshop"],
      required: true,
    },
  },
  { timestamps: true }
);

/* ✅ One user → one registration per event */
RegistrationSchema.index(
  { userId: 1, eventTitle: 1, eventType: 1 },
  { unique: true }
);

export const Registration =
  models.Registration || model("Registration", RegistrationSchema);
