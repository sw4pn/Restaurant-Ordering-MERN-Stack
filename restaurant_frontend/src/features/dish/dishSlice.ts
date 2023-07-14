import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../libs/config";
import { axiosConfig } from "../../libs/axiosConfig";
import { RootState } from "../../store";

export const getAllDishes = createAsyncThunk(
  "dishes/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${Config.API_URL}dishes/`, axiosConfig);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const getADish = createAsyncThunk<Dish, string, { rejectValue: string }>(
  "dishes/getADish",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Config.API_URL}dishes/${id}`,
        axiosConfig
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const resetDishesState = createAction("RESET_PRODUCTS");

export interface DishState {
  menu: Dish[] | undefined;
  dish: Dish | undefined;
  dishSuccess: boolean;
  dishLoading: boolean;
  dishError: boolean;
  dishMessage: string | undefined;
}

const initialState = {
  menu: [],
  dish: undefined,
  dishSuccess: false,
  dishError: false,
  dishLoading: false,
  dishMessage: undefined,
} as DishState;

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDishes.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(getAllDishes.fulfilled, (state, action) => {
        const data: any = action.payload;

        state.menu = data;
        state.dishLoading = false;
        state.dishSuccess = data?.success || true;
        state.dishError = data?.error || false;
        state.dishMessage = data?.message || undefined;
      })
      .addCase(getAllDishes.rejected, (state, action) => {
        const data: any = action.payload;

        state.menu = [];
        state.dishError = true;
        state.dishLoading = false;
        state.dishSuccess = false;
        state.dishMessage = data?.message || undefined;
      })
      .addCase(getADish.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(getADish.fulfilled, (state, action) => {
        const data: any = action.payload;

        state.dish = data;
        state.dishLoading = false;
        state.dishSuccess = data?.success || true;
        state.dishError = data?.error || false;
        state.dishMessage = data?.message || undefined;
      })
      .addCase(getADish.rejected, (state, action) => {
        const data: any = action.payload;

        state.dish = undefined;
        state.dishError = true;
        state.dishLoading = false;
        state.dishSuccess = false;
        state.dishMessage = data?.message || undefined;
      })
      .addCase(resetDishesState, () => initialState);
  },
});

export const selectAllDishes = (state: RootState) => state.dishes.menu;
export const selectADish = (state: RootState) => state.dishes.dish;

export default dishSlice.reducer;
