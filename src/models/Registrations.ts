import mongoose, { Schema, models, model } from "mongoose";

const RegistrationSchema = new Schema(
  {
    // 🔹 link with your User collection
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },

    utr: { type: String, required: true },

    paid: { type: Boolean, default: false },
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

/* ✅ THIS is the real duplicate stopper
   One user → one registration per event
*/
RegistrationSchema.index(
  { userId: 1, eventTitle: 1 },
  { unique: true }
);

export const Registration =
  models.Registration || model("Registration", RegistrationSchema);
