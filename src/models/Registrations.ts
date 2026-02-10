import mongoose, { Schema, models, model } from "mongoose";

const RegistrationSchema = new Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    utr: { type: String, required: true },


    eventTitle: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["technical", "nontechnical", "workshop"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Registration =
  models.Registration || model("Registration", RegistrationSchema);
