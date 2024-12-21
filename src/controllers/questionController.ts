import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/async";
import Category from "../models/categories";
import Question from "../models/questions";
import  fs  from "fs";
import csvParser from 'csv-parser';

//api to insert questions in bulk
export const bulkInsertQuestions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // make sure file is present
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const results: { text: string; categories: string }[] = [];
      const filePath = req.file.path;
  
      // Parse CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data: { text: string; categories: string }) => {
          if (data.text && data.categories) {
            results.push({ text: data.text, categories: data.categories });
          }
        })
        .on('end', async () => {
          try {
            const questions = await Promise.all(
              results.map(async (row) => {
                // Split categories into an array and fetch corresponding category IDs
                const categoryNames = row.categories.split(',').map((name) => name.trim());
                const categories = await Category.find({ name: { $in: categoryNames } });
                const categoryIds = categories.map((cat) => cat._id);
  
                // make sure all categories exist
                if (categoryIds.length !== categoryNames.length) {
                  const missingCategories = categoryNames.filter(
                    (name) => !categories.some((cat) => cat.name === name)
                  );
                  throw new Error(`Categories not found: ${missingCategories.join(', ')}`);
                }
  
                // Create and return the new Question with multiple categories
                return new Question({
                  text: row.text,
                  categories: categoryIds, // Attach all category IDs to this question
                });
              })
            );
  
            // Save all questions
            await Promise.all(questions.map((q) => q.save()));
  
            // Remove temporary file
            fs.unlinkSync(filePath);
  
            res.status(201).json({
              message: 'Questions imported successfully.',
              data: results,
            });
          } catch (error) {
            next(error);
          }
        });
    } catch (error) {
      next(error);
    }
  });
  
  export const getQuestionsForEachCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // MongoDB Aggregation pipeline
      const result = await Category.aggregate([
        {
          $lookup: {
            from: 'questions', // Collection to join (Questions)
            localField: '_id',  // Field from Categories to match with Questions
            foreignField: 'categories', // Field from Questions to match with Categories
            as: 'questions', // The result of the lookup will be stored in the "questions" field
          },
        },
        {
          $project: {
            name: 1, // Include category name
            questions: {
              text: 1, // Only include the question text
              _id: 1,  // Include question ID
            },
          },
        },
        {
          $sort: {
            'name': 1, // Sort categories alphabetically (or as per your requirement)
          },
        },
      ]);
  
      // Return the aggregated data
      res.status(200).json({ message: 'Categories with Questions fetched successfully', data: result });
    } catch (error) {
      next(error);
    }
  });