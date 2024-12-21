import { Document } from "mongoose";
import { IUserDocument } from "./users";
import { IQuestionDocument } from "./questions";

export interface IAnswer {
  userId: IUserDocument | null;
  questionId: IQuestionDocument | null;
  answer: string;
}

export interface IAnswerDocument extends IAnswer, Document {}