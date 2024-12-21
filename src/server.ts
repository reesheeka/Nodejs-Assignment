import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routeManager from "./routes/route.manager";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

const mongoUri = process.env.MONGO_URI || "";

app.use("/", routeManager);
//database connection
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
