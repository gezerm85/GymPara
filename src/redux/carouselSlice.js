import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock carousel verilerini çek
export const fetchCarouselData = createAsyncThunk(
  'carousel/fetchCarouselData',
  async () => {
    try {
      // Mock carousel verileri
      const carouselItems = [
        {
          id: 1,
          title: "Yeni Antrenman Programı",
          description: "Kişiselleştirilmiş antrenman programınızı keşfedin",
          color: "#FF6B6B",
          img: ""
        },
        {
          id: 2,
          title: "Beslenme Rehberi",
          description: "Sağlıklı beslenme ipuçları ve öneriler",
          color: "#4ECDC4",
          img: ""
        },
        {
          id: 3,
          title: "İlerleme Takibi",
          description: "Fitness hedeflerinizi takip edin ve başarılarınızı görün",
          color: "#45B7D1",
          img: ""
        }
      ];
      
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