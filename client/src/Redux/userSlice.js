import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {axiosInstance} from "../config"
import { toast, ToastContainer } from "react-toastify";

const initialState = {
    isLoading : false,
    errorMessage : '',
    currentUser: null,
}

export const login = createAsyncThunk(
    'user/login',
    async (user) => {
      try {
        const response = await axiosInstance.post('/auth/login',user)
        return response.data;
      } catch (error) {
        toast.error("Lỗi đăng nhập !", {
                          position: "top-left"
                      });
      }
    }
  );


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logOut: ()=> initialState
    },

    extraReducers: (builder) => {
      // Start login request
      builder.addCase(login.pending, (state) => {
        state.isLoading = true;
      });
  
      // Request successful
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      });
  
      // Request error
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    },  
})

export const {logOut} = userSlice.actions

export const selectUser = (state) => state.user.currentUser;
export const selectLoading = (state) => state.user.isLoading;
export const selectErrorMessage = (state) => state.user.errorMessage;

export default userSlice.reducer