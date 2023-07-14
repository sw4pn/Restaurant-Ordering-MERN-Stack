import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter EmailId"],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minLength: [6, "Password should be greater than 5 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
