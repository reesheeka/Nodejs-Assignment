import { Document, Types } from "mongoose";

export interface IQuestion {
  text: string;
  categories:Types.ObjectId[];
}

export interface IQuestionDocument extends IQuestion, Document {}
