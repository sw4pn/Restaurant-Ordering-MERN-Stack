import expressAsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import { validateMongoId } from "../utils/validateMongoId.js";
import sendResponse from "../utils/sendResponse.js";
import { createError } from "../utils/ErrorHandler.js";
import User from "../model/User.js";

/**
 *  
    orderItems: [
      {
        dish:  
        price:  
        quantity: 
      },
    ],  
    totalPrice:   
 */

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  const { shippingInfo, orderItems, estDelivery, orderedBy } = req.body;

  if (!shippingInfo || orderItems.length <= 0 || !estDelivery || !orderedBy) {
    return next(createError(400, "Error Empty Details."));
  }

  const estimatedDate = new Date(estDelivery);

  const totalPrice = orderItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    shippingInfo,
    orderItems,
    orderedBy,
    estDelivery: estimatedDate,
    totalPrice,
  });

  if (order) {
    return sendResponse(
      req,
      res,
      200,
      true,
      "Order created successfully.",
      order._doc
    );
  }

  return next(createError(400, "Error processing order."));
});

export const getOrder = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  validateMongoId(id);

  const order = await Order.findById(id)
    .populate([
      {
        path: "orderItems.dish",
        select: "_id name image price description",
      },
    ])
    .lean();

  if (order) return sendResponse(req, res, 200, true, "success", order);

  return next(createError(400, "Order not found."));
});

export const updateOrder = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  validateMongoId(id);

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, lean: true }
  );

  if (!updatedOrder) return next(createError(500, "Error updating order"));

  return sendResponse(
    req,
    res,
    200,
    true,
    "Order updated successfully.",
    updatedOrder
  );
});

export const deleteOrder = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  validateMongoId(id);
  const deletedProduct = await Order.findByIdAndDelete(id).lean();

  if (deletedProduct)
    return sendResponse(
      req,
      res,
      200,
      true,
      "Order deleted successfully.",
      deletedProduct
    );

  return next(createError(400, "Error deleting Order."));
});

export const getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  if (orders) return sendResponse(req, res, 200, true, "success", orders);

  return next(createError(400, "Error getting all orders."));
});

export const getUserOrders = expressAsyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const orders = await Order.find({ orderedBy: userId })
    .sort({ createdAt: -1 })
    .lean();

  if (orders) return sendResponse(req, res, 200, true, "success", orders);

  return next(createError(400, "Error getting all orders."));
});
