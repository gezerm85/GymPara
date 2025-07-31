import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // kaldırıldı (Firestore'a taşınacaksa)

// AsyncStorage key
const STORAGE_KEY = "favorites";

// Async olarak kaydet
const saveFavoritesToStorage = async (favorites) => {
  try {
    // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); // kaldırıldı
  } catch (error) {
    console.error("Favoriler kaydedilemedi", error);
  }
};

// Async olarak yükle
export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFromStorage',
  async () => {
    try {
      // const json = await AsyncStorage.getItem(STORAGE_KEY); // kaldırıldı
      return []; // Firestore'a taşındığı için boş döndürülüyor
    } catch (error) {
      console.error("Favoriler yüklenemedi", error);
      return [];
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((fav) => fav.id === item.id);
      if (exists) {
        state.items = state.items.filter((fav) => fav.id !== item.id);
      } else {
        state.items.push(item);
      }

      saveFavoritesToStorage(state.items); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
