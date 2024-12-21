import { Schema, model } from "mongoose";
import { IUserDocument } from "../types/users";

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IUserDocument>("Users", userSchema);
