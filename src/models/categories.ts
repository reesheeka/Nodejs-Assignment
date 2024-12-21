import { Schema, model } from "mongoose";
import { ICategoryDocument } from "../types/categories";

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ICategoryDocument>("Categories", categorySchema);
