import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔁 Récupérer toutes les demandes (admin)
export const getAllDemandesPerso = createAsyncThunk(
  "demandePerso/getAll",
  async () => {
    const res = await axios.get("http://localhost:5000/demandePerso/all");
    return res.data;
  }
);

// 📩 Récupérer les demandes par email client
export const getDemandesByEmail = createAsyncThunk(
  "demandePerso/byEmail",
  async (email) => {
    const res = await axios.get(
      `http://localhost:5000/demandePerso/by-email/${email}`
    );
    return res.data;
  }
);

// ➕ Ajouter une demande
export const addDemandePerso = createAsyncThunk(
  "demandePerso/add",
  async (formData) => {
    const res = await axios.post("http://localhost:5000/demandePerso/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

// 🛠️ Modifier le statut
export const updateStatutDemande = createAsyncThunk(
  "demandePerso/updateStatut",
  async ({ id, statut }) => {
    const res = await axios.put(`http://localhost:5000/demandePerso/update-statut/${id}`, { statut });
    return res.data;
  }
);

// ❌ Supprimer une demande
export const deleteDemandePerso = createAsyncThunk(
  "demandePerso/delete",
  async (id) => {
    const res = await axios.delete(`http://localhost:5000/demandePerso/delete/${id}`);
    return res.data;
  }
);

// Slice
const demandePersoSlice = createSlice({
  name: "demandePerso",
  initialState: {
    demandes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDemandesPerso.fulfilled, (state, action) => {
        state.demandes = action.payload;
        state.loading = false;
      })
      .addCase(getDemandesByEmail.fulfilled, (state, action) => {
        state.demandes = action.payload;
        state.loading = false;
      })
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default demandePersoSlice.reducer;
