import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from"axios";
export const getarticle = createAsyncThunk ("article/get",async()=> {try {
    let result = axios.get("http://localhost:5000/article/allarticle")
    return result;
} catch (error) {
    console.log(error);
}})
export const addarticle = createAsyncThunk ("article/add",async(article)=> {try {
    let result = axios.post("http://localhost:5000/article/addarticle",article)
    return result;
} catch (error) {
    console.log(error);
}})
export const deletearticle= createAsyncThunk ("article/delete",async(id)=> {try {
    let result = axios.delete (`http://localhost:5000/article/${id}`)
    return result;
} catch (error) {
    console.log(error);
}})
export const editarticle = createAsyncThunk ("article/update",async({id,edited})=> {try {
    let result = axios.put (`http://localhost:5000/article/${id}`,edited)
    return result;
} catch (error) {
    console.log(error);
}})
const initialState={
    articlelist:null,
    status:null,
}

export const articleSlice = createSlice({

  name: 'article',
  initialState,
  reducers: {},
  extraReducers:{
    [getarticle.pending]:(state) => {
        state.status="pending";
    },
    [getarticle.fulfilled]:(state,action) => {
        state.status="fullfilled";
        state.articlelist =action.payload.data.article;
    },
    [getarticle.rejected]:(state) => {
        state.status="rejected";
    },

    [addarticle.pending]:(state) => {
        state.status="pending";
    },
    [addarticle.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [addarticle.rejected]:(state) => {
        state.status="rejected";
    },

    [deletearticle.pending]:(state) => {
        state.status="pending";
    },
    [deletearticle.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [deletearticle.rejected]:(state) => {
        state.status="rejected";
    },

    [editarticle.pending]:(state) => {
        state.status="pending";
    },
    [editarticle.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [editarticle.rejected]:(state) => {
        state.status="rejected";
    },

    

  },
})

// Action creators are generated for each case reducer function
export const { } =articleSlice.actions

export default articleSlice.reducer