import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

// Async thunks
export const createClient = createAsyncThunk(
  "clients/create",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await api.post("/clients", {
        ...clientData,
        created_by: "admin",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create client");
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/update",
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/clients/${id}`, {
        ...clientData,
        updated_by: "admin",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update client");
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (clientId, { rejectWithValue }) => {
    try {
      await api.delete(`/clients/${clientId}`);
      return clientId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete client");
    }
  }
);

export const fetchClients = createAsyncThunk(
  "clients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/clients");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch clients");
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    items: [],
    loading: false,
    error: null,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetClientState: (state) => {
      state.loading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch clients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create client
      .addCase(createClient.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Update client
      .addCase(updateClient.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      // Delete client
      .addCase(deleteClient.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetClientState } = clientsSlice.actions;
export default clientsSlice.reducer;
