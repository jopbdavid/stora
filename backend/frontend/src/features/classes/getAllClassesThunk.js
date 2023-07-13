import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

import { hideLoading } from "./allClassesSlicer";

export const getAllClassesThunk = async (_, thunkAPI) => {
  // const { searchStatus, searchType, sort, search, page } =
  //   thunkAPI.getState().allClasses;
  // let url = `/class?status=${searchStatus}&sort=${sort}&page=${page}`;
  // if (search) {
  //   url = `/class?status=${searchStatus}&sort=${sort}&page=${page}&search=${search}`;
  // }
  let url = "/class";
  try {
    const { data } = await customFetch.get(url);

    return data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
