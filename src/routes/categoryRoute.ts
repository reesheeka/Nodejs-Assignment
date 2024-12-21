import express from "express";
import {
  createCategories,
  getAllCategories,
} from "../controllers/categoryController";

const router = express.Router();

//route to create category
router.post("/create", createCategories);
//route to get all category
router.get("/getAll", getAllCategories);

export default router;
