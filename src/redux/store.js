import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import mainReducer from "./mainSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    main: mainReducer,
  },
});

