import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import mainReducer from "./mainSlice";
import favoriteReducer from './FavoriteSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    main: mainReducer,
    favorites: favoriteReducer,
  },
});

