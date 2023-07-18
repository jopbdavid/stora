import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addClassThunk, editClassThunk, deleteClassThunk } from "./classThunk";
import { toast } from "react-toastify";

export const addClass = createAsyncThunk(
  "class/addClass",
  async (classData, thunkAPI) => {
    return addClassThunk("/class", classData, thunkAPI);
  }
);

export const editClass = createAsyncThunk(
  "class/aditClass",
  async (classData, thunkAPI) => {
    return editClassThunk("/class", classData, thunkAPI);
  }
);

export const deleteClass = createAsyncThunk(
  "class/deleteClass",
  async (id, thunkAPI) => {
    return deleteClassThunk("/class", id, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  year: "",
  letter: "",
  classProfessor: "",
  students: [],
  isEditing: false,
};

const classSlicer = createSlice({
  name: "class",
  initialState,
  reducers: {
    handleClassInput: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(`New class:  ${action.payload.newClass.name} `);
      })
      .addCase(addClass.rejected, (state, action) => {
        state.isLoading = false;

        toast.error(action.payload);
      })
      .addCase(deleteClass.pending, (state) => {})
      .addCase(deleteClass.fulfilled, (state, { payload }) => {
        toast.success(payload.data.msg);
      })
      .addCase(deleteClass.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editClass.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(editClass.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export const { handleClassInput } = classSlicer.actions;
export default classSlicer.reducer;
