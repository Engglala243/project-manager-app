import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newsletterService } from "../services/newsletterService";

// Async thunks
export const subscribeToNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await newsletterService.subscribe(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unsubscribeFromNewsletter = createAsyncThunk(
  "newsletter/unsubscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await newsletterService.unsubscribe(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = "";
    },
    resetNewsletterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Unsubscribe
      .addCase(unsubscribeFromNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(unsubscribeFromNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(unsubscribeFromNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, resetNewsletterState } =
  newsletterSlice.actions;
export default newsletterSlice.reducer;
