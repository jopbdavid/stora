import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

import { hideLoading } from "./allClassesSlicer";

export const getAllClassesThunk = async (_, thunkAPI) => {
  const { searchStatus, searchType, sort, search, page } =
    thunkAPI.getState().allClasses;
  let url = `/classes?status=${searchStatus}&sort=${sort}&page=${page}`;
  if (search) {
    url = `/classes?status=${searchStatus}&sort=${sort}&page=${page}&search=${search}`;
  }

  try {
    const {
      data: { classes, numOfPages, totalClasses },
    } = await customFetch.get(url);
    return { classes, numOfPages, totalClasses };
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
