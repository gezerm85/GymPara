import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import mainReducer from "./mainSlice";
import favoriteReducer from './FavoriteSlice'
import userExercisesReducer from "./userExercisesSlice";
import pointsReducer from "./pointsSlice";
import carouselReducer from "./carouselSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    main: mainReducer,
    favorites: favoriteReducer,
    userExercises: userExercisesReducer,
    points: pointsReducer,
    carousel: carouselReducer,
  },
});

