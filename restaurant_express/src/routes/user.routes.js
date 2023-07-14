import express from "express";

import { onlyAuthorized } from "../middlewares/AuthMiddleware.js";
import {
  loginUser,
  logout,
  verifyUser,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/verify-user", onlyAuthorized, verifyUser);
router.get("/logout", logout);

export default router;
