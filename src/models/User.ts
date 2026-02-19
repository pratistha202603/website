import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    gender: {
  type: String,
  enum: ["male", "female"],
  required: true,
},

    password: {
      type: String,
      required: true,
    },

    // 👇 will be filled later from form
    college: { type: String },
    mobile: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
