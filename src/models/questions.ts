import mongoose, { Schema, model } from "mongoose";
import { IQuestionDocument } from "../types/questions";

const questionSchema = new Schema<IQuestionDocument>(
  {
    text: { type: String, required: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required:true
      },
    ],
  },
  { timestamps: true }
);

export default model<IQuestionDocument>("Questions", questionSchema);
