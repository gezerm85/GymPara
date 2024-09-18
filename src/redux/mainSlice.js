import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadIsAuth = createAsyncThunk(
  "main/loadIsAuth",
  async (_, { dispatch }) => {
    try {
      const auth = await AsyncStorage.getItem("isAuth");
      if (auth !== null) {
        const isAuth = JSON.parse(auth);
        dispatch(setIsAuth(isAuth));
      } else {
        dispatch(setIsAuth(false));
      }
    } catch (e) {
      console.error("AsyncStorage'dan veri alınırken hata oluştu:", e);
      dispatch(setIsAuth(false));
    }
  }
);

const initialState = {
  isAuth: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth =
        action.payload !== undefined ? action.payload : !state.isAuth;
    },
    toggleAuth: (state) => {
      state.isAuth = !state.isAuth;
      AsyncStorage.setItem("isAuth", JSON.stringify(state.isAuth));
    },
  },
});

export const { setIsAuth, toggleAuth } = mainSlice.actions;

export default mainSlice.reducer;
