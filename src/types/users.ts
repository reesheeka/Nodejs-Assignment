import { Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface IUserDocument extends IUser, Document {}
