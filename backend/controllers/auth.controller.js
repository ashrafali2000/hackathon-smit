import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// import { User } from "../models/user.model.js";
// import { Student, Teacher } from "../models/user.model.js";
// signup user
export const signup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    role,
    rollNO,
    batch,
    campus,
    course,
    gender,
    phoneNo,
  } = req.body;
  console.log(role);
  if (role === "student") {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === "" ||
      role === "" ||
      rollNO === "" ||
      batch === "" ||
      campus === "" ||
      course === "" ||
      gender === "" ||
      phoneNo === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
  }
  if (role === "teacher") {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === "" ||
      role === "" ||
      campus === "" ||
      course === "" ||
      gender === "" ||
      phoneNo === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  if (role === "teacher") {
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
      campus,
      course,
      gender,
      phoneNo,
    });

    try {
      await newUser.save();
      res.json("SignUp is Successful");
    } catch (error) {
      next(error);
    }
  }
  if (role === "student") {
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
      rollNO,
      batch,
      campus,
      course,
      gender,
      phoneNo,
    });

    try {
      await newUser.save();
      res.json("SignUp is Successful");
    } catch (error) {
      next(error);
    }
  }
};
// signin user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        path: "/",
        // httpOnly: true, // Make it HTTP only for security
        // secure: process.env.NODE_ENV === "production", // Secure in production
        // sameSite: "none", // Allow cross-site cookie
        expires: new Date(Date.now() + 900000), // 15 minutes
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
// signin user with google
export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
