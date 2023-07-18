import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const addStudentThunk = async (url, studentData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, studentData);
    console.log(data);
    return data;
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

export const editStudentThunk = async (url, studentData, thunkAPI) => {
  try {
    const data = await customFetch.patch(url, studentData);
    console.log(data);
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
