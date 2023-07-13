import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllClassesThunk } from "./getAllClassesThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  classes: [],
  totalClasses: 0,
  numOfPages: 1,
  page: 1,
  ...initialFiltersState,
};

export const getAllClasses = createAsyncThunk(
  "class/getAllClasses",
  async (_, thunkAPI) => {
    return getAllClassesThunk(_, thunkAPI);
  }
);

const allClassesSlicer = createSlice({
  name: "allClasses",
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
      .addCase(getAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllClasses.fulfilled,
        (state, { payload: { classes, totalClasses } }) => {
          state.isLoading = false;
          state.classes = classes;
          state.totalClasses = totalClasses;
        }
      )
      .addCase(getAllClasses.rejected, (state, action) => {
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
} = allClassesSlicer.actions;
export default allClassesSlicer.reducer;
