import mongoose, { Schema, models, model } from "mongoose";

const CoordinatorSchema = new Schema({
  name: { type: String, required: true },

  // later this will come from login
  userId: { type: String, required: true },

  events: [{ type: String }], // event titles
});

export const Coordinator =
  models.Coordinator || model("Coordinator", CoordinatorSchema);
