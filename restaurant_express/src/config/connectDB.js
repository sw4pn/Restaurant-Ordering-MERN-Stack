import mongoose from "mongoose";
import config from "./config.js";

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DATABASE_URL);
    if (conn) console.log("Connected to database!");
  } catch (err) {
    console.log("Error connecting to database");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from database!");
});

export default connectDB;
