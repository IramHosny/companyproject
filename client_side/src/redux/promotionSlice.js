import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Récupérer toutes les promotions
export const getPromotions = createAsyncThunk('promotion/getAll', async () => {
  const res = await axios.get('http://localhost:5000/promotion/all');
  return res.data.promotions;
});

// ✅ Ajouter une promotion
export const addPromotion = createAsyncThunk('promotion/add', async (newPromo) => {
  const res = await axios.post('http://localhost:5000/promotion/add', newPromo);
  return res.data.promotion;
});

// ✅ Supprimer une promotion
export const deletePromotion = createAsyncThunk('promotion/delete', async (id) => {
  await axios.delete(`http://localhost:5000/promotion/${id}`);
  return id;
});

// ✅ Modifier une promotion
export const updatePromotion = createAsyncThunk('promotion/update', async ({ id, updatedPromo }) => {
  const res = await axios.put(`http://localhost:5000/promotion/${id}`, updatedPromo);
  return res.data.promotion;
});

// ✅ State initial
const initialState = {
  promotions: [],
  status: null,
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getPromotions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.promotions = action.payload;
      })
      .addCase(getPromotions.rejected, (state) => {
        state.status = 'failed';
      })
      // add
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.promotions.unshift(action.payload);
      })
      // delete
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.promotions = state.promotions.filter((p) => p._id !== action.payload);
      })
      // update
      .addCase(updatePromotion.fulfilled, (state, action) => {
        const index = state.promotions.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.promotions[index] = action.payload;
        }
      });
  },
});

export default promotionSlice.reducer;
