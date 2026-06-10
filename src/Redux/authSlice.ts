import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IAuthState, ILoginUser } from "../types/type";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

const tokenData = localStorage.getItem("fakekartToken");
const initialState: IAuthState = {
  isLoading: false,
  dashBoardData: null,
  isAuthenticated: tokenData ? true : false,
  // isAuthenticated: !!localStorage.getItem("fakekartToken") // short method
};

export const registerUser = createAsyncThunk(
  "/register",
  async (formData: FormData) => {
    try {
      const res = await axiosInstance.post(endPoints.auth.signup, formData);

      return res?.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Registration Failed!");
    }
  },
);

export const loginUser = createAsyncThunk(
  "/login",
  async (formData: ILoginUser) => {
    try {
      const res = await axiosInstance.post(endPoints.auth.login, formData);

      return res?.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!!",
      );
    }
  },
);

export const userDashboard = createAsyncThunk("/dashboard", async () => {
  try {
    const res = await axiosInstance.get(endPoints.auth.dashboard);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
});

export const logoutUser = createAsyncThunk("/logout", async () => {
  try {
    const res = await axiosInstance.post(endPoints.auth.logout);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const fakekartToken = action?.payload?.token;
        if (fakekartToken) {
          localStorage.setItem("fakekartToken", fakekartToken);
          localStorage.setItem("fakeKartUserId", action?.payload?.data?.id);
          localStorage.setItem(
            "fakeKartUsername",
            action?.payload?.data?.username,
          );
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        localStorage.removeItem("fakekartToken");
      })
      .addCase(userDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDashboard.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.dashBoardData = action?.payload?.data;
      })
      .addCase(userDashboard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.dashBoardData = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
