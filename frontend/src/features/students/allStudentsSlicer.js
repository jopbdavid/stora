import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllStudentsThunk } from "./getAllStudentsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  students: [],
  totalStudents: 0,
  numOfPages: 1,
  page: 1,
  ...initialFiltersState,
};

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async (_, thunkAPI) => {
    return getAllStudentsThunk(_, thunkAPI);
  }
);

export const getStudents = createAsyncThunk(
  "student/GetStudents",
  async (studentsIds, thunkAPI) => {
    return getAllStudentsThunk(studentsIds, thunkAPI);
  }
);

const allStudentsSlicer = createSlice({
  name: "allStudents",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },

    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    handleFilters: (state, { payload }) => {
      state.page = 1;
      state[payload.name] = payload.value;
    },
    changePrev: (state) => {
      state.page -= 1;
    },
    changeNext: (state) => {
      state.page += 1;
    },
    activePage: (state, action) => {
      state.page = action.payload;
    },
    clearAllJobs: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllStudents.fulfilled,
        (state, { payload: { students, totalStudents } }) => {
          state.isLoading = false;
          state.students = students;
          state.totalStudents = totalStudents;
        }
      )
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export const {
  showLoading,
  hideLoading,
  clearAllJobs,
  clearFilters,
  handleFilters,
  changePrev,
  changeNext,
  activePage,
} = allStudentsSlicer.actions;
export default allStudentsSlicer.reducer;
