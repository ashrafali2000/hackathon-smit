import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import feedBackRoutes from "./routes/feedback.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const DbPassword = process.env.USER_PASSWORD1;
mongoose
  .connect(
    `mongodb+srv://ashrafalikakozai9876:${DbPassword}@hackathon.91zacg8.mongodb.net/?retryWrites=true&w=majority&appName=hackathon`
  )
  .then(() => {
    console.log("DataBase is connected--->");
  })
  .catch((err) => {
    console.log("err------>", err);
  });
const app = express();
// const corsOptions = {
//   origin: "https://mern-blog-app-py3d.vercel.app", // Replace with your frontend domain
//   credentials: true, // Allow credentials (cookies)
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedBackRoutes);
app.use("/api/comment", commentRoutes);

// app.get("/", function (req, res) {
//   res.send("Server is running...");
// });
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({ success: false, statusCode, message });
// });
app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
