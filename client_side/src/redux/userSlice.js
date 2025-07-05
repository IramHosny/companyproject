import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

// REGISTER
export const userRegister = createAsyncThunk("user/register", async (user) => {
    try {
        const response = await axios.post("http://localhost:5000/user/register", user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// LOGIN
export const userLogin = createAsyncThunk("user/login", async (user) => {
    try {
        const response = await axios.post("http://localhost:5000/user/login", user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// CURRENT
export const userCurrent = createAsyncThunk("user/current", async () => {
    try {
        const response = await axios.get("http://localhost:5000/user/current", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        console.log("✅ [userCurrent] response.data:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// EDIT USER
export const userEdit = createAsyncThunk("user/update", async ({ id, edituser }) => {
    try {
        const response = await axios.put(`http://localhost:5000/user/${id}`, edituser);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// DELETE USER
export const removeuser = createAsyncThunk("user/delete", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: {
        // REGISTER
        [userRegister.pending]: (state) => {
            state.status = "pending";
        },
        [userRegister.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            Swal.fire("Merci pour votre inscription !");
            if (!action.payload) return;
            state.user = action.payload.newUserToken;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.newUserToken));
        },
        [userRegister.rejected]: (state) => {
            state.status = "rejected";
        },

        // LOGIN
        [userLogin.pending]: (state) => {
            state.status = "pending";
        },
        [userLogin.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            if (!action.payload) return;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        [userLogin.rejected]: (state) => {
            state.status = "rejected";
            Swal.fire("Vérifiez vos données");
        },

        // CURRENT
        [userCurrent.pending]: (state) => {
            state.status = "pending";
        },
        [userCurrent.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            if (!action.payload) {
                console.warn("⚠️ [userCurrent] payload vide");
                return;
            }
            const userFromPayload = action.payload.user || action.payload;
            state.user = userFromPayload;
            localStorage.setItem("user", JSON.stringify(userFromPayload));
        },
        [userCurrent.rejected]: (state) => {
            state.status = "rejected";
        },

        // DELETE
        [removeuser.pending]: (state) => {
            state.status = "pending";
        },
        [removeuser.fulfilled]: (state) => {
            state.status = "fulfilled";
        },
        [removeuser.rejected]: (state) => {
            state.status = "rejected";
        },
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
