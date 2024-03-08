import { userModel } from "../../../DB/model/user.model.js";
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import AppError from "../../../utils/appError.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateJWT from "../../../utils/generateJWT.js";
export const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await userModel
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

export const register = asyncWrapper(async (req, res, next) => {
  const { userName, email, password, role, deg } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    const error = AppError.create(
      "email already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser;
  if (!req.file) {
    newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
      role,
      deg,
    });
  } else {
    newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
      role,
      deg,
      avatar: req.file.filename,
    });
  }
  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!email && !password) {
    const error = AppError.create(
      "email and password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  } else if (!password || !user) {
    const error = AppError.create("all is required", 400, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    // generate Token
    const token = await generateJWT({
      name: user.userName,
      email: user.email,
      id: user._id,
      role: user.role,
      deg: user.deg,
      avatar: user.avatar,
    });
    return res.json({ status: httpStatusText.SUCCESS, token });
  } else {
    const error = AppError.create("something wrong", 500, httpStatusText.ERROR);
    return next(error);
  }
});
