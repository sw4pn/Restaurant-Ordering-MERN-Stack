import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../libs/config";
import { axiosConfig } from "../../libs/axiosConfig";
import { RootState } from "../../store";

export const loadUser = createAsyncThunk<User>("auth/loadUser", async () => {
  const response = await axios.get(
    `${Config.API_URL}users/verify-user`,
    axiosConfig
  );
  return await response.data;
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    const response = await axios.post(
      `${Config.API_URL}auth/login`,
      data,
      axiosConfig
    );
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${Config.API_URL}users/logout`,
      axiosConfig
    );

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const resetUserState = createAction("RESET_USER");

export interface UserState {
  user: User | undefined;
  isAuthenticated: boolean;
  authMessage: string | undefined;
  authLoading: boolean;
  authSuccess: boolean;
  authError: boolean;
}

const initialState: UserState = {
  user: undefined,
  isAuthenticated: false,
  authMessage: undefined,
  authLoading: false,
  authError: false,
  authSuccess: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = data;
        state.authLoading = false;
        state.isAuthenticated = data?.success ? true : false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.isAuthenticated = false;
        state.user = undefined;
        state.authLoading = false;
        state.authMessage = data?.message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(logout.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = undefined;
        state.authLoading = false;
        state.isAuthenticated = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(logout.rejected, (state, action) => {
        const data: any = action.payload;
        state.user = undefined;
        state.isAuthenticated = false;
        state.authLoading = false;
        state.authMessage = data?.message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(resetUserState, () => initialState);
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
