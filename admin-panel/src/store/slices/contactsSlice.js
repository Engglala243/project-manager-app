import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

// Async thunks
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch contacts");
    }
  }
);

export const fetchContactById = createAsyncThunk(
  "contacts/fetchById",
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch contact");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId, { rejectWithValue }) => {
    try {
      await api.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete contact");
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    selectedContact: null,
    loading: false,
    error: null,
    deleteLoading: false,
    count: 0,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
    resetContactState: (state) => {
      state.loading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch contact by ID
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.count = state.items.length;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedContact, resetContactState } =
  contactsSlice.actions;
export default contactsSlice.reducer;
