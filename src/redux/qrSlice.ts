import { axiosClient } from "../service/axios";
import type { RootState } from "./store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
interface QrCode {
  id: string;
  url: string;
  qrCodeDataUrl: string;
  createdAt: string;
}

interface QrState {
  qrCode: QrCode | null;
  loading: boolean;
  error: string | null;
}

const initialState: QrState = {
  qrCode: null,
  loading: false,
  error: null,
};


export const generateQRCodeThunk = createAsyncThunk(
  "qr/generate",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient().post("/qr-code", { url });
      if (response.data) {
        return response.data;
      }
      return rejectWithValue("Failed to generate QR code");
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error generating QR code"
      );
    }
  }
);

export const getLatestQRCodeThunk = createAsyncThunk(
  "qr/getLatest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("/qr-code");
      if (response.data) {
        return response.data;
      }
      return rejectWithValue("No QR code found");
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error fetching QR code"
      );
    }
  }
);

const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    clearQrCode: (state) => {
      state.qrCode = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(generateQRCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRCodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
      })
      .addCase(generateQRCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getLatestQRCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestQRCodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
      })
      .addCase(getLatestQRCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQrCode } = qrSlice.actions;


export const selectQr = (state: RootState) => (state as any).qr as any;
export const selectQrCode = (state: RootState) => selectQr(state).qrCode;
export const selectQrLoading = (state: RootState) => selectQr(state).loading;
export const selectQrError = (state: RootState) => selectQr(state).error;

export default qrSlice.reducer;