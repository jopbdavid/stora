import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    console.log("Logging user", user);
    const { data } = await customFetch.post(url, user);
    console.log("Logging data", data);

    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);

    const newUser = data.user;
    return newUser;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(url, user);
    const updatedUser = data.user;
    return updatedUser;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllUsersThunk = async (_, thunkAPI) => {
  let url = "/auth/users";
  try {
    const { data } = await customFetch.get(url);
    console.log(data);

    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
