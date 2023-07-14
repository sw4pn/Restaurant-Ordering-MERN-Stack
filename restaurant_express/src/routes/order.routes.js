import express from "express";
import { onlyAuthorized } from "../middlewares/AuthMiddleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", onlyAuthorized, createOrder);
router.put("/:id", onlyAuthorized, updateOrder);
router.delete("/:id", onlyAuthorized, deleteOrder);
router.get("/user", onlyAuthorized, getUserOrders);
router.get("/:id", onlyAuthorized, getOrder);
router.get("/", onlyAuthorized, getAllOrders);

export default router;
