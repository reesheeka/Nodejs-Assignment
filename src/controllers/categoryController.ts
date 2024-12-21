import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/async";
import categories from "../models/categories";
import { ICategoryDocument } from "../types/categories";

export const createCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    try {
      //check required field
      if (!name) {
        return res.status(400).json({ message: "Category name is required!" });
      }

      //check existing category with name
      const existCategory: ICategoryDocument | null = await categories.findOne({
        name,
      });
      if (existCategory) {
        return res
          .status(400)
          .json({ message: `Category with ${name} already exist!` });
      }

      // Create new category
      const newCategory = await categories.create(req.body);

      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      next(error);
    }
  }
);

export const getAllCategories = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const categoryData = await categories.find() //get all categories
        res.status(200).json({success:true, data: categoryData})
    }catch(error){
        next(error)
    }
})