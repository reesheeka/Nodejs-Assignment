import express from "express";
import { getUsersAnswers, createAnswer } from "../controllers/answerController";

const router = express.Router();

//route to get answer
router.get("/get", getUsersAnswers);
//route to create answer
router.post("/create", createAnswer);

export default router;
