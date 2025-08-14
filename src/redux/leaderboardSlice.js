import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

// API'den leaderboard verilerini çek
export const fetchLeaderboardData = createAsyncThunk(
  'leaderboard/fetchLeaderboardData',
  async () => {
    try {
      const response = await fetch(`${API_URL}/user/leaderboard`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const leaderboardData = await response.json();
      return leaderboardData;
    } catch (error) {
      console.error("Leaderboard verileri yüklenirken hata:", error);
      throw error;
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLeaderboardData: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const { clearLeaderboardData } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
