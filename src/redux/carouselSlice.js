import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

// Gerçek API'den carousel verilerini çek
export const fetchCarouselData = createAsyncThunk(
  'carousel/fetchCarouselData',
  async () => {
    try {
      const response = await fetch(`${API_URL}/carousel`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const carouselItems = await response.json();
      
      // order_number'a göre sırala
      carouselItems.sort((a, b) => a.order_number - b.order_number);
      
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