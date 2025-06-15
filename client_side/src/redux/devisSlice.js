import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Ajouter un nouveau devis (client)
export const addDevis = createAsyncThunk("devis/add", async (formData) => {
  const res = await axios.post("http://localhost:5000/devis/add", formData);
  return res.data;
});

// ✅ Récupérer tous les devis (admin)
export const getDevis = createAsyncThunk("devis/getAll", async () => {
  const res = await axios.get("http://localhost:5000/devis/all");
  return res.data;
});

// ✅ Récupérer les devis du client connecté
export const getMyDevis = createAsyncThunk("devis/getMine", async () => {
  const res = await axios.get("http://localhost:5000/devis/all"); // tu peux filtrer côté backend plus tard
  return res.data;
});

// ✅ Upload d’un fichier PDF pour un devis existant (admin)
export const uploadDevisPDF = createAsyncThunk(
  "devis/uploadPDF",
  async ({ id, pdfFile }) => {
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    const res = await axios.put(`http://localhost:5000/devis/upload-pdf/${id}`, formData);
    return res.data;
  }
);

// ❌ Supprimer un devis (admin)
export const deleteDevis = createAsyncThunk("devis/delete", async (id) => {
  await axios.delete(`http://localhost:5000/devis/delete/${id}`);
  return id;
});

const devisSlice = createSlice({
  name: "devis",
  initialState: {
    devisList: [],   // tous les devis (admin)
    mesdevis: [],    // devis client connecté
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDevis.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDevis.fulfilled, (state, action) => {
        state.loading = false;
        state.mesdevis.push(action.payload);
      })
      .addCase(addDevis.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getDevis.fulfilled, (state, action) => {
        state.devisList = action.payload;
      })

      .addCase(getMyDevis.fulfilled, (state, action) => {
        state.mesdevis = action.payload;
      })

      .addCase(uploadDevisPDF.fulfilled, (state, action) => {
        const index = state.devisList.findIndex(d => d._id === action.payload.devis._id);
        if (index !== -1) {
          state.devisList[index] = action.payload.devis;
        }
      })

      .addCase(deleteDevis.fulfilled, (state, action) => {
        state.devisList = state.devisList.filter(d => d._id !== action.payload);
      });
  },
});

export default devisSlice.reducer;
