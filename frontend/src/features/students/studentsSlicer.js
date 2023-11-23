import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addStudentThunk,
  editStudentThunk,
  deleteStudentThunk,
} from "./studentsThunk.js";
import { toast } from "react-toastify";

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (studentData, thunkAPI) => {
    return addStudentThunk("/student", studentData, thunkAPI);
  }
);

export const editStudent = createAsyncThunk(
  "student/editStudent",
  async (studentData, thunkAPI) => {
    return editStudentThunk("/student", studentData, thunkAPI);
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, thunkAPI) => {
    return deleteStudentThunk("/student", id, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  isEditing: false,
  firstName: "",
  LastName: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  email: "",
  guardianName: "",
  guardianContact: null,
  guardianEmail: "",
  className: "",
  photo: "",
};

const studentsSlicer = createSlice({
  name: "students",
  initialState,
  reducers: {
    handleStudentInput: (state, action) => {
      const { name, value } = action.payload;

      return { ...state, [name]: value };
    },
    resetForm: (state) => {
      return initialState;
    },
    toggleEditMode: (state) => {
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(
          `New student:  ${action.payload.student.firstName} ${action.payload.student.lastName} `
        );
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;

        toast.error(action.payload.error);
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

export const { handleStudentInput, resetForm } = studentsSlicer.actions;
export default studentsSlicer.reducer;
