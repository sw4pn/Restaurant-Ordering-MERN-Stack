import expressAsyncHandler from "express-async-handler";
import { createError } from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import sendResponse from "../utils/sendResponse.js";
import { validateMongoId } from "../utils/validateMongoId.js";
import generateRefreshToken from "../config/refreshToken.js";

export const createUser = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const userPassword = req.body?.password;

  if (!email || !userPassword)
    return next(createError(400, "All fields are required."));

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);

  const user = await User.findOne({ email: email });

  if (user) return next(createError(400, "User with email already exists."));

  const newUser = await new User({
    email,
    password: hash,
  }).save();

  if (newUser) {
    return sendResponse(
      req,
      res,
      200,
      true,
      "User successfully registered",
      newUser._doc
    );
  }

  return next(createError(400, "Unknown error occurred."));
});

export const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (users) return sendResponse(req, res, 200, true, "success", users);

  return next(createError(400, "Unknown error occurred."));
});

export const getUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);

  const user = await User.findById(id).lean();

  if (user) return sendResponse(req, res, 200, true, "success", user);

  return next(createError(400, "User not found."));
});

export const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  ).lean();

  if (updatedUser)
    return sendResponse(
      req,
      res,
      200,
      true,
      "User updated successfully.",
      updatedUser
    );

  return next(createError(400, "Unknown error occurred."));
});

export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);

  const deletedUser = await User.findByIdAndDelete(id).lean();

  if (deletedUser)
    return sendResponse(
      req,
      res,
      200,
      true,
      "User deleted successfully.",
      deletedUser
    );

  return next(createError(400, " Unknown error occurred."));
});

export const verifyUser = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) return next(createError(401, "User verification failed."));

  const { ...userData } = user;

  return sendResponse(req, res, 200, true, "success", userData);
});

export const logout = expressAsyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  const refreshToken = cookie?.accessToken;
  if (!refreshToken)
    return next(createError(401, "User not logged in. (No refresh token)"));

  const user = await User.findOne({ refreshToken });

  const removedCookie = res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  if (!removedCookie) {
    const setCookie = res.cookie("accessToken", refreshToken, {
      httpOnly: true,
      maxAge: 1,
      sameSite: "None",
      secure: true,
      path: "/",
    });

    if (setCookie)
      return sendResponse(req, res, 200, true, "User logged out successfully.");

    return next(
      createError(401, "User not available. Please clear your cookies.")
    );
  }

  if (removedCookie && user)
    return sendResponse(req, res, 200, true, "Logged out successfully.");

  return next(createError(204, "Forbidden."));
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("password");

  if (!user) return next(createError(404, "User not found"));

  const checkPassword = await bcrypt.compare(password, user.password);

  if (user && checkPassword) {
    // --- generate refresh token
    const refreshToken = generateRefreshToken(user.id);

    // --- set refresh token
    const setRefreshToken = await User.findByIdAndUpdate(
      user.id,
      { refreshToken },
      { new: true }
    ).lean();

    // --- set cookie (refresh token)
    if (!setRefreshToken) {
      return next(createError(400, "Error while updating refresh token."));
    }

    // --- set cookie (refresh token)
    const setCookie = res.cookie("accessToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    // --- get and return data
    if (!setCookie)
      return next(createError(400, "Error while setting refresh token."));

    const { password, ...userData } = setRefreshToken;

    return sendResponse(req, res, 200, true, "Login successful.", {
      ...userData,
      token: generateRefreshToken(user.id),
    });
  }

  return next(createError(400, "Wrong email or password."));
});
