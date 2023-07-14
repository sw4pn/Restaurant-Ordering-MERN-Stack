import mongoose from "mongoose";
import { Schema, ObjectId } from "mongoose";

const orderSchema = new Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    orderItems: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalPrice: { type: Number, required: true },

    deliveryStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
        "Processing Return",
        "Return Complete",
        "Refund Complete",
      ],
    },
    estDelivery: { type: Date },
    orderTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
