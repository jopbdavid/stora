import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { getAllClasses } from "./allClassesSlicer";

export const addClassThunk = async (url, classData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, classData);
    thunkAPI.dispatch(getAllClasses());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteClassThunk = async (url, id, thunkAPI) => {
  try {
    const data = await customFetch.delete(`${url}/${id}`);
    thunkAPI.dispatch(getAllClasses());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editClassThunk = async (url, classData, thunkAPI) => {
  try {
    const data = await customFetch.patch(url, classData);

    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
