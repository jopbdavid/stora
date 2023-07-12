import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const addClassThunk = async (url, classData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, classData);

    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteClassThunk = async (url, thunkAPI) => {
  try {
    const data = await customFetch.delete(url);
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
