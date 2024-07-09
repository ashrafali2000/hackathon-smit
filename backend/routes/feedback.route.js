import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createFeedBack,
  deleteFeedBack,
  getFeedBacks,
  updateFeedBack,
} from "../controllers/feedback.controller.js";

const router = express.Router();
router.post("/create", verifyToken, createFeedBack);
router.get("/getfeedbacks", getFeedBacks);
router.delete("/deletefeedback/:postId/:userId", verifyToken, deleteFeedBack);
router.put("/updatefeedback/:postId/:userId", verifyToken, updateFeedBack);

export default router;
