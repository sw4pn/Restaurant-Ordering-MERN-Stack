import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config/config.js";
import connectDB from "./config/connectDB.js";

import dishRoutes from "./routes/dish.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";

import { ErrorHandler, notFoundHandler } from "./utils/ErrorHandler.js";

const port = config.PORT;

const app = express();

await connectDB();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/dishes/", dishRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json("ok");
});

// error handlers
app.use(notFoundHandler);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at ${config.URL}:${port}`);
});

export default app;
