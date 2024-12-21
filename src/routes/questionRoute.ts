import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  getQuestionsForEachCategory,
  bulkInsertQuestions,
} from "../controllers/questionController";

const router = Router();

// Multer setup for file upload
const upload = multer({
  //upload directory defined
  dest: path.join(__dirname, "../../uploads"),
  fileFilter: (req, file, cb) => {
    //file type defined
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files are allowed."));
    } else {
      cb(null, true);
    }
  },
});

// Route to bulk insert questions
router.post("/bulk-insert", upload.single("file"), bulkInsertQuestions);
//route to get questions by category
router.get("/category", getQuestionsForEachCategory);

export default router;
