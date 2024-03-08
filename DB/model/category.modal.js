import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const categoryModel = model(`Category`, categorySchema);
