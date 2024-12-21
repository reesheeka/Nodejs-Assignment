import express from "express";
import { upload } from "../middleware/multer";
import {
  registerUser,
  loginUser,
  viewUserProfile,
  editUserProfile,
} from "../controllers/userController";

const router = express.Router();

//route to register user
router.post("/register", registerUser);
//route for login user
router.post("/login", loginUser);
//route for view user profile
router.get("/:userId", viewUserProfile);
//route for update user profile with profile picture
router.put("/profile", upload.single("profilePicture"), editUserProfile);

export default router;
