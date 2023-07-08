import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const addStudentThunk = async (url, classData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, classData);
    console.log(data);
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteStudentThunk = async (url, thunkAPI) => {
  try {
    const data = await customFetch.delete(url);
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editStudentThunk = async (url, job, thunkAPI) => {
  try {
    const data = await customFetch.patch(url, job);
    console.log(data);
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
