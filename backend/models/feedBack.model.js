import { mongoose, version } from "mongoose";
const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    feedback: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      default: "none",
    },
    instructorName: {
      type: String,
      default: "none",
    },
    studentName: {
      type: String,
      default: "none",
    },
    campusName: {
      type: String,
      default: "none",
    },
    rollNO: {
      type: String,
      default: "none",
    },
    batch: {
      type: String,
      default: "none",
    },
    approve: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const FeedBack = mongoose.model("FeedBack", feedbackSchema);
export default FeedBack;

// category: {
//   type: String,
//   default: "uncategorized",
// },
// slug: {
//   type: String,
//   required: true,
//   unique: true,
// },
