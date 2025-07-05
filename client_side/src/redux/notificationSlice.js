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
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/notifications/${id}`);
      return id; // on retourne l'id supprimé pour le retirer de la liste
    } catch (error) {
      console.error("Erreur suppression notification :", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Erreur suppression");
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
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
  state.list = state.list.filter((notif) => notif._id !== action.payload);
});
      
  },
});

export default notificationSlice.reducer;
