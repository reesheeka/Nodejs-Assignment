import { Document } from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
}

export interface ICategoryDocument extends ICategory, Document {}