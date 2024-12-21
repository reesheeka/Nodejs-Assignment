import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/async";
import Question from "../models/questions";
import Answer from "../models/answers";

export const createAnswer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, questionId, answer } = req.body;

      //required fields check
      if (!userId) {
        return res.status(400).json({ error: "UserId is required!" });
      }
      if (!questionId) {
        return res.status(400).json({ error: "QuestionId is required!" });
      }
      if (!answer) {
        return res.status(400).json({ error: "Answer is required!" });
      }

      //create new answer
      const newAnswer = await Answer.create({
        userId: userId,
        questionId: questionId,
        answer: answer,
      });

      res
        .status(201)
        .json({ message: "Answer created successfully", data: newAnswer });
    } catch (error) {
      next(error);
    }
  }
);

//api to get all users answers
export const getUsersAnswers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Question.aggregate([
        {
          $lookup: {
            from: "answers", // Join with Answers collection
            localField: "_id", // Match Question _id with Answer's questionId
            foreignField: "questionId", // Use the field 'questionId' from the Answer collection
            as: "answers", // Store results in the 'answers' field
          },
        },
        {
          $unwind: { path: "$answers", preserveNullAndEmptyArrays: true }, // Flatten the 'answers' array
        },
        {
          $lookup: {
            from: "users", // Join with Users collection
            localField: "answers.userId", // Match Answer's 'userId' field
            foreignField: "_id", // Match with Users' _id field
            as: "answers.userDetails", // Store the user details in 'userDetails' field
          },
        },
        {
          $project: {
            text: 1, // Include question text
            "answers.answer": 1, // Include the user's answer
            "answers.userDetails.username": 1, // Include the user's username
            "answers.userDetails.email": 1, // Include the user's email
          },
        },
        {
          $sort: {
            text: 1, // Sort questions by text
          },
        },
      ]);

      res
        .status(200)
        .json({ message: "Users answers fetched successfully", data: result });
    } catch (error) {
      next(error);
    }
  }
);
