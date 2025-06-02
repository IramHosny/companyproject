import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// get all orders 
export const getorders = createAsyncThunk("order/get", async() => {
    try {
        let result = axios.get("http://localhost:5000/commande/allorders");
        return result ; 
    } catch (error) {
        console.log(error);
    }
});

//add new order 
export const addorder = createAsyncThunk("order/add", async(order) => {
    try {
        let result = axios.post("http://localhost:5000/commande/addorder", order);
        return result ; 
    } catch (error) {
        console.log(error);
    }
});

//update order 
export const updateorder = createAsyncThunk("order/update", async({id}) => {
    try {
        let result = axios.put(`http://localhost:5000/commande/${id}`);
        return result ; 
    } catch (error) {
        console.log(error);
    }
});

//remove order
export const removeorder = createAsyncThunk("order/delete", async(id) => {
    try {
        let result = axios.delete(`http://localhost:5000/commande/${id}`);
        return result ; 
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    order : null ,
    status : null
  }
  
  export const orderSlice = createSlice({
    name: 'order',
    initialState,
  
    reducers: {
   
    },
   extraReducers : {
      [getorders.pending] : (state) => {
          state.status = "pending" 
      },
      [getorders.fulfilled] : (state, action) => {
          state.status = "fullfilled";
          state.order = action.payload.data.order;
      },
      [getorders.rejected] : (state) => {
          state.status = "rejected" 
      },
      
      [addorder.pending] : (state) => {
          state.status = "pending" 
      },
      [addorder.fulfilled] : (state) => {
          state.status = "fullfilled";
      },
      [addorder.rejected] : (state) => {
          state.status = "rejected" 
      },
      
      [updateorder.pending] : (state) => {
          state.status = "pending" 
      },
      [updateorder.fulfilled] : (state) => {
          state.status = "fullfilled";
      },
      [updateorder.rejected] : (state) => {
          state.status = "rejected" 
      },
      [removeorder.pending] : (state) => {
        state.status = "pending" 
    },
    [removeorder.fulfilled] : (state) => {
        state.status = "fullfilled";
    },
    [removeorder.rejected] : (state) => {
        state.status = "rejected" 
    },
   }
  });

  export const {  } = orderSlice.actions

export default orderSlice.reducer
