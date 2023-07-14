import expressAsyncHandler from "express-async-handler";
import Dish from "../model/Dish.js";
import sendResponse from "../utils/sendResponse.js";
import { validateMongoId } from "../utils/validateMongoId.js";
import { createError } from "../utils/ErrorHandler.js";

export const createDish = expressAsyncHandler(async (req, res, next) => {
  const newDish = await Dish.create(req.body);

  if (newDish)
    return sendResponse(
      req,
      res,
      200,
      true,
      "Dish added successfully.",
      newDish._doc
    );

  return next(createError(400, "Unknown error."));
});

export const updateDish = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  validateMongoId(id);

  const dish = await Dish.findOne({
    name: req.body.name,
  }).lean();

  if (dish && dish._id.toString() !== id) {
    return next(createError(400, "Dish already exists."));
  }

  const updatedDish = await Dish.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  ).lean();

  if (updatedDish)
    return sendResponse(
      req,
      res,
      200,
      true,
      "Dish updated successfully.",
      updatedDish
    );

  return next(createError(400, "Unknown Error."));
});

export const deleteDish = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  validateMongoId(id);

  const deletedBrand = await Dish.findByIdAndDelete(id).lean();

  if (deletedBrand)
    return sendResponse(
      req,
      res,
      200,
      true,
      "Brand deleted successfully.",
      deletedBrand
    );

  return next(createError(500, "Unknown Error."));
});

export const getAllDishes = expressAsyncHandler(async (req, res, next) => {
  const dishes = await Dish.find().lean();

  if (dishes) return sendResponse(req, res, 200, true, "success", dishes);

  return next(createError(500, "Unknown error."));
});

export const getDish = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  validateMongoId(id);

  const dish = await Dish.findById(id).lean();

  if (dish) return sendResponse(req, res, 200, true, "success", dish);

  return next(createError(500, "Dish not found."));
});
