import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/users";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../types/users";
import asyncHandler from "../middleware/async";

// Register a new user
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      //required fields check
      if (!username) {
        return res.status(400).json({ message: "Username is required !" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required !" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required !" });
      }
      // Check if the email already exists
      const existingEmail: IUserDocument | null = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      //check email exist in db
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      //match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      //generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

// View user profile
export const viewUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //userid in path params
      const userId = req.params.userId;
      //search in db by userid
      const user: IUserDocument | null = await User.findById(userId).select(
        "-password"
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //return user profile
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

export const editUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Prepare updated fields
      const updatedData: any = {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
      };

      // If profile picture is uploaded, update the picture URL
      if (req.file) {
        updatedData.profilePicture = `/uploads/profile_pics/${req.file.filename}`;
      }

      // Update user document in the database
      const updatedUser = await User.findOneAndUpdate({ email }, updatedData, {
        new: true,
      });

      // Return updated user profile
      res.status(200).json({
        message: "User profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);
