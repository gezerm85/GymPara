import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import mainReducer from "./mainSlice";
import favoriteReducer from './FavoriteSlice'
import userExercisesReducer from "./userExercisesSlice";
import pointsReducer from "./pointsSlice";
import carouselReducer from "./carouselSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import exercisesReducer from "./exercisesSlice";
import rewardsReducer from "./rewardsSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    main: mainReducer,
    favorites: favoriteReducer,
    userExercises: userExercisesReducer,
    points: pointsReducer,
    carousel: carouselReducer,
    auth: authReducer,
    user: userReducer,
    exercises: exercisesReducer,
    rewards: rewardsReducer,
  },
});

