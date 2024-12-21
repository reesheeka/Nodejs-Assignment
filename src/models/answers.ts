import { Schema, model } from "mongoose";
import { IAnswerDocument } from "../types/answers";

const answerSchema = new Schema<IAnswerDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    questionId: { type: Schema.Types.ObjectId, ref: "Questions", required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IAnswerDocument>("Answers", answerSchema);
