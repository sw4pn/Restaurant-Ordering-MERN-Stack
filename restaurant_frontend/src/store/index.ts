import { configureStore } from "@reduxjs/toolkit";

import dishReducer from "../features/dish/dishSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    dishes: dishReducer,
    orders: orderReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
