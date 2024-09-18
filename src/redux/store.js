import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import mainReducer from "./mainSlice";
import { loadIsAuth } from "./mainSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    main: mainReducer,
  },
});

store.dispatch(loadIsAuth());
