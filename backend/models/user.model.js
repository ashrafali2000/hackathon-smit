import { mongoose } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/profileimg.webp",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    approve: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
    },
    rollNO: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
  },
  { timestamps: true }
);
// const teacherSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profilePicture: {
//       type: String,
//       default: "/profileimg.webp",
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

const User = mongoose.model("User", userSchema);
export default User;
// export const Teacher = mongoose.model("Teacher", teacherSchema);
