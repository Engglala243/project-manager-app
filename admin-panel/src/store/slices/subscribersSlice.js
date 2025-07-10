import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

// Async thunks
export const fetchSubscribers = createAsyncThunk(
  "subscribers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/subscribers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch subscribers");
    }
  }
);

export const deleteSubscriber = createAsyncThunk(
  "subscribers/delete",
  async (subscriberId, { rejectWithValue }) => {
    try {
      await api.delete(`/subscribers/${subscriberId}`);
      return subscriberId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete subscriber");
    }
  }
);

const subscribersSlice = createSlice({
  name: "subscribers",
  initialState: {
    items: [],
    loading: false,
    error: null,
    deleteLoading: false,
    count: 0,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSubscriberState: (state) => {
      state.loading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subscribers
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete subscriber
      .addCase(deleteSubscriber.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.count = state.items.length;
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetSubscriberState } = subscribersSlice.actions;
export default subscribersSlice.reducer;
