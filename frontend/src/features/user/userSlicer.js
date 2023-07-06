import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk } from "./userThunk";

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

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlicer.reducer;
