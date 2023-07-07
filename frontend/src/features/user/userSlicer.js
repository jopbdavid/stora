import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";
import { addUserToLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  user: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("auth/updateUser", user, thunkAPI);
  }
);

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload;
        addUserToLocalStorage(action.payload);
        toast.success(`New user: Welcome ${action.payload.name}`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        addUserToLocalStorage(action.payload);
        toast.success(`Login successful: Welcome back ${state.user.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export default userSlicer.reducer;
