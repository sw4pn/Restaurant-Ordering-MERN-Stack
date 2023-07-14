import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../libs/config";
import { axiosConfig } from "../../libs/axiosConfig";
import { RootState } from "../../store";

export const createOrder = createAsyncThunk<
  Order,
  Order,
  { rejectValue: string }
>("order/create", async (data, thunkAPI) => {
  try {
    const response = await axios.post(
      `${Config.API_URL}orders/`,
      data,
      axiosConfig
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getAllOrders = createAsyncThunk(
  "order/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${Config.API_URL}orders/`, axiosConfig);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("order/get", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `${Config.API_URL}orders/${id}`,
      axiosConfig
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetOrderState = createAction("RESET_ORDER_STATE");

export interface OrderState {
  order: Order | null;
  createdOrder: Order | null;
  orders: Order[];
  orderLoading: boolean;
  orderError: boolean;
  orderSuccess: boolean;
  orderMessage: string | undefined;
}

const initialState: OrderState = {
  order: null,
  orders: [],
  createdOrder: null,
  orderLoading: false,
  orderError: false,
  orderSuccess: false,
  orderMessage: undefined,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.createdOrder = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.createdOrder = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orders = restData;
        state.orderLoading = false;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.orders = [];
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(getOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.order = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(getOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.order = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(resetOrderState, () => initialState);
  },
});

export const selectOrderState = (state: RootState) => state.orders;
export const selectOrder = (state: RootState) => state.orders.order;
export const selectAllOrders = (state: RootState) => state.orders.orders;

export default orderSlice.reducer;
