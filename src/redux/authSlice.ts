import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToLocalStorage } from "../utils/localstorage";
import { AUTH_TOKEN, AUTH_TOKEN_TIMESTAMP, AUTH_USER } from "../constants/constants";
import { axiosClient } from "../service/axios";
import type { RootState } from "./store";

export type LoginType = {
  email: string;
  password: string;
}

export type User = {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isLogin: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}


const initialState: AuthState = {
  isLogin: !!localStorage.getItem(AUTH_TOKEN),
  user: JSON.parse(localStorage.getItem(AUTH_USER) || 'null'),
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginType, { rejectWithValue }) => {
    try {
      const resp = await axiosClient().post("/auth/login", {
        email,
        password,
      });

      if (resp.data?.status === 200) {
        const authUser = resp.data.user;
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;

        setToLocalStorage(AUTH_TOKEN, resp.data);
        setToLocalStorage(AUTH_USER, authUser);
        setToLocalStorage(AUTH_TOKEN_TIMESTAMP, expirationTime.toString());
        return authUser;
      } else {
        return rejectWithValue(resp.data.message || "Login failed");
      }
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Login error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_USER);
      localStorage.removeItem(AUTH_TOKEN_TIMESTAMP);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;


export const selectAuth = (state: RootState) => state.auth;
export const selectIsLogin = (state: RootState) => selectAuth(state).isLogin;
export const selectUser = (state: RootState) => selectAuth(state).user;
export const selectAuthLoading = (state: RootState) => selectAuth(state).loading;
export const selectAuthError = (state: RootState) => selectAuth(state).error;