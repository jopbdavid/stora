import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.get(url, user);
    const userData = data.user;
    return userData;
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
