import express from "express";

import { onlyAuthorized } from "../middlewares/AuthMiddleware.js";
import {
  createDish,
  updateDish,
  deleteDish,
  getAllDishes,
  getDish,
} from "../controllers/dishController.js";

const router = express.Router();

router.post("/", onlyAuthorized, createDish);
router.put("/:id", onlyAuthorized, updateDish);
router.delete("/:id", onlyAuthorized, deleteDish);
router.get("/:id", getDish);
router.get("/", getAllDishes);

export default router;
