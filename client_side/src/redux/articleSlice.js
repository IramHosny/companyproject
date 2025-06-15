import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ GET ARTICLES
export const getarticle = createAsyncThunk("article/get", async () => {
  try {
    const result = await axios.get("http://localhost:5000/article/allarticle");
    return result.data.article;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// ✅ ADD ARTICLE
export const addarticle = createAsyncThunk("article/add", async (formData) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/article/addarticle",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data.article;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// ✅ DELETE ARTICLE
export const deletearticle = createAsyncThunk("article/delete", async (id) => {
  try {
    await axios.delete(`http://localhost:5000/article/${id}`);
    return { id };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// ✅ EDIT ARTICLE
export const editarticle = createAsyncThunk("article/update", async ({ id, edited }) => {
  try {
    const result = await axios.put(`http://localhost:5000/article/${id}`, edited);
    return result.data.article;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// 🔁 Initial State
const initialState = {
  articlelist: [],
  status: null,
};

// ✅ SLICE
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ GET ARTICLES
      .addCase(getarticle.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getarticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.articlelist = action.payload || [];
      })
      .addCase(getarticle.rejected, (state) => {
        state.status = "rejected";
      })

      // ✅ ADD ARTICLE
      .addCase(addarticle.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addarticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const article = action.payload;
        if (article) {
          state.articlelist.push(article);
        }
      })
      .addCase(addarticle.rejected, (state) => {
        state.status = "rejected";
      })

      // ✅ DELETE ARTICLE
      .addCase(deletearticle.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletearticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.articlelist = state.articlelist.filter(
          (a) => a._id !== action.payload.id
        );
      })
      .addCase(deletearticle.rejected, (state) => {
        state.status = "rejected";
      })

      // ✅ EDIT ARTICLE
      .addCase(editarticle.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editarticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const updated = action.payload;
        state.articlelist = state.articlelist.map((a) =>
          a._id === updated._id ? updated : a
        );
      })
      .addCase(editarticle.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default articleSlice.reducer;
