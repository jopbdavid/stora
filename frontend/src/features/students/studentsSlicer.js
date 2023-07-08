import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addStudentThunk,
  editStudentThunk,
  deleteStudentThunk,
} from "./classThunk";
import { toast } from "react-toastify";

export const addStudent = createAsyncThunk(
  "class/addStudent",
  async (url, classData, thunkAPI) => {
    return addStudentThunk(url, classData, thunkAPI);
  }
);

export const editStudent = createAsyncThunk(
  "class/editStudent",
  async (url, classData, thunkAPI) => {
    return editStudentThunk(url, classData, thunkAPI);
  }
);

export const deleteStudent = createAsyncThunk(
  "class/deleteStudent",
  async (url, classData, thunkAPI) => {
    return deleteStudentThunk(url, classData, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  name: "",
  age: "",
  address: "",
  class: [],
  special: false,
  isEditing: false,
};

const studentsSlicer = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`New class:  ${action.payload.name} `);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteStudent.pending, (state) => {})
      .addCase(deleteStudent.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export default studentsSlicer.reducer;
