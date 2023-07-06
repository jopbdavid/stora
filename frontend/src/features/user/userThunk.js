import customFetch from "../../utils/axios";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const data = await customFetch.get(url, user);
  } catch (error) {
    console.log(error);
  }
};

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const data = await customFetch.post(url, user);
  } catch (error) {
    console.log(error);
  }
};
