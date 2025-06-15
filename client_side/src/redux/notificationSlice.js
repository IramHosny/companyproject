import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (email, { rejectWithValue }) => {
    try {
      
      const res = await axios.get(`http://localhost:5000/notifications/${email}`);
      return res.data;
    } catch (error) {
      console.error("Erreur lors du fetch des notifications :", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification", 
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

export default notificationSlice.reducer;
