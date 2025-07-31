import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../firebase/firebaseConfig";

// Firebase'den carousel verilerini çek
export const fetchCarouselData = createAsyncThunk(
  'carousel/fetchCarouselData',
  async () => {
    try {
      const carouselCollection = collection(firestoreDB, "carouselCards");
      const carouselSnapshot = await getDocs(carouselCollection);
      
      const carouselItems = [];
      carouselSnapshot.forEach((doc) => {
        const data = doc.data();
        carouselItems.push({
          id: data.id || doc.id,
          title: data.title || "",
          description: data.description || "",
          color: data.color || "#4ECDC4",
          img: data.img || "",
        });
      });
      
      // ID'ye göre sırala
      carouselItems.sort((a, b) => a.id - b.id);
      return carouselItems;
    } catch (error) {
      console.error("Carousel verileri yüklenirken hata:", error);
      throw error;
    }
  }
);

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCarouselData: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCarouselData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const { clearCarouselData } = carouselSlice.actions;
export default carouselSlice.reducer; 