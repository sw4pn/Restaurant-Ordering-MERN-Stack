import mongoose from "mongoose";

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "/images/dish-image.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Dish", DishSchema);
