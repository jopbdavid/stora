import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./features/user/userSlicer";
import classSlicer from "./features/classes/classSlicer";
import allClassesSlicer from "./features/classes/allClassesSlicer";

export const store = configureStore({
  reducer: {
    user: userSlicer,
    class: classSlicer,
    allClasses: allClassesSlicer,
  },
});
