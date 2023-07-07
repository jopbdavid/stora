import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "api/v1",
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.message.data.msg);
};

export default customFetch;
